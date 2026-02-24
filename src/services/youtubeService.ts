import type { ChannelStat, StreamStat, VideoStat } from "../types/stats.js";
import { extractStreamId, extractVideoId } from "../utils/youtubeUrls.js";

type YouTubeError = {
    error?: {
        code?: number;
        message?: string;
    };
};

type VideoStatisticsResponse = YouTubeError & {
    items?: Array<{
        statistics?: {
            viewCount?: string;
            likeCount?: string;
            favoriteCount?: string;
            commentCount?: string;
        };
    }>;
};

type ChannelStatisticsResponse = YouTubeError & {
    items?: Array<{
        statistics?: {
            viewCount?: string;
            subscriberCount?: string;
            hiddenSubscriberCount?: boolean;
            videoCount?: string;
        };
    }>;
};

type StreamStatisticsResponse = YouTubeError & {
    items?: Array<{
        liveStreamingDetails?: {
            concurrentViewers?: string;
            scheduledStartTime?: string;
            actualStartTime?: string;
            activeLiveChatId?: string;
        };
    }>;
};

type LiveStreamSearchResponse = YouTubeError & {
    items?: Array<{
        id?: {
            videoId?: string;
        };
    }>;
};

type LatestVideoSearchResponse = YouTubeError & {
    items?: Array<{
        id?: {
            videoId?: string;
        };
    }>;
};

export type LatestVideoStat = VideoStat & {
    videoId: string;
};

export type ActiveStreamStat = {
    streamId?: string;
    stat: StreamStat;
};

/** TTL for cached "latest video" id per channel (90 min). */
const LATEST_VIDEO_CACHE_TTL_MS = 90 * 60 * 1000;
/** TTL for cached "no active stream" (30 min — re-check to discover new stream). */
const ACTIVE_STREAM_CACHE_TTL_MS_EMPTY = 30 * 60 * 1000;
/** TTL for cached "active stream" id (90 min — stream is live, save quota). */
const ACTIVE_STREAM_CACHE_TTL_MS_LIVE = 90 * 60 * 1000;

export class YoutubeService {
    private readonly latestVideoCache = new Map<string, { videoId: string; cachedAt: number }>();
    private readonly activeStreamCache = new Map<string, { streamId: string | null; cachedAt: number }>();

    private isCacheValid(entry: { cachedAt: number } | undefined, ttlMs: number): boolean {
        return entry != null && Date.now() - entry.cachedAt < ttlMs;
    }

    private getCachedLatestVideoId(channelId: string): string | undefined {
        const entry = this.latestVideoCache.get(channelId);
        return entry != null && this.isCacheValid(entry, LATEST_VIDEO_CACHE_TTL_MS) ? entry.videoId : undefined;
    }

    private setCachedLatestVideoId(channelId: string, videoId: string): void {
        this.latestVideoCache.set(channelId, { videoId, cachedAt: Date.now() });
    }

    private getCachedActiveStreamId(channelId: string): { streamId: string | null } | undefined {
        const entry = this.activeStreamCache.get(channelId);
        if (entry == null) return undefined;
        const ttlMs = entry.streamId == null ? ACTIVE_STREAM_CACHE_TTL_MS_EMPTY : ACTIVE_STREAM_CACHE_TTL_MS_LIVE;
        if (!this.isCacheValid(entry, ttlMs)) return undefined;
        return { streamId: entry.streamId };
    }

    private setCachedActiveStreamId(channelId: string, streamId: string | null): void {
        this.activeStreamCache.set(channelId, { streamId, cachedAt: Date.now() });
    }

    async loadVideoStat(apiKey: string, videoInput: string): Promise<VideoStat> {
        const videoId = extractVideoId(videoInput);
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(apiKey)}`;
        const response = await this.fetchJSON<VideoStatisticsResponse>(url);
        const result = response.items?.[0]?.statistics;
        if (!result) {
            throw new Error("Video not found or inaccessible.");
        }

        return {
            viewCount: result.viewCount ?? "0",
            likeCount: result.likeCount ?? "0",
            favoriteCount: result.favoriteCount ?? "0",
            commentCount: result.commentCount ?? "0",
        };
    }

    async loadChannelStat(apiKey: string, channelId: string): Promise<ChannelStat> {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey)}`;
        const response = await this.fetchJSON<ChannelStatisticsResponse>(url);
        const result = response.items?.[0]?.statistics;
        if (!result) {
            throw new Error("Channel not found or inaccessible.");
        }

        return {
            viewCount: result.viewCount ?? "0",
            subscribersCount: result.subscriberCount ?? "0",
            hiddenSubscribersCount: result.hiddenSubscriberCount ?? false,
            videoCount: result.videoCount ?? "0",
        };
    }

    async loadStreamStat(apiKey: string, streamInput: string): Promise<StreamStat> {
        const streamId = extractStreamId(streamInput);
        const url = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${encodeURIComponent(streamId)}&key=${encodeURIComponent(apiKey)}`;
        const response = await this.fetchJSON<StreamStatisticsResponse>(url);
        const result = response.items?.[0]?.liveStreamingDetails;
        if (!result) {
            throw new Error("Stream not found or inaccessible.");
        }

        return {
            concurrentViewers: result.concurrentViewers ?? "0",
            scheduledStartTime: result.scheduledStartTime,
            actualStartTime: result.actualStartTime,
            activeLiveChatId: result.activeLiveChatId,
        };
    }

    async loadActiveStreamByChannel(apiKey: string, channelId: string): Promise<ActiveStreamStat> {
        const cached = this.getCachedActiveStreamId(channelId);
        let streamId: string | null;
        if (cached !== undefined) {
            streamId = cached.streamId;
        } else {
            const url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${encodeURIComponent(channelId)}&eventType=live&type=video&maxResults=1&key=${encodeURIComponent(apiKey)}`;
            const response = await this.fetchJSON<LiveStreamSearchResponse>(url);
            streamId = response.items?.[0]?.id?.videoId ?? null;
            this.setCachedActiveStreamId(channelId, streamId);
        }

        if (!streamId) {
            return {
                stat: {
                    concurrentViewers: "0",
                },
            };
        }

        try {
            const stat = await this.loadStreamStat(apiKey, streamId);
            return { streamId, stat };
        } catch {
            this.setCachedActiveStreamId(channelId, null);
            return {
                streamId,
                stat: {
                    concurrentViewers: "0",
                },
            };
        }
    }

    async loadLatestVideo(apiKey: string, channelId: string): Promise<LatestVideoStat> {
        let videoId = this.getCachedLatestVideoId(channelId);
        if (videoId == null) {
            const latestVideoUrl = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${encodeURIComponent(channelId)}&maxResults=1&order=date&type=video&key=${encodeURIComponent(apiKey)}`;
            const latestVideoResponse = await this.fetchJSON<LatestVideoSearchResponse>(latestVideoUrl);
            videoId = latestVideoResponse.items?.[0]?.id?.videoId;
            if (!videoId) {
                throw new Error("Latest video not found for this channel.");
            }
            this.setCachedLatestVideoId(channelId, videoId);
        }

        const stat = await this.loadVideoStat(apiKey, videoId);
        return {
            videoId,
            ...stat,
        };
    }

    private async fetchJSON<T extends YouTubeError>(url: string): Promise<T> {
        const response = await fetch(url);
        const data = (await response.json()) as T;
        if (!response.ok || data.error) {
            throw new Error(data.error?.message ?? `YouTube API request failed with status ${response.status}`);
        }
        return data;
    }
}
