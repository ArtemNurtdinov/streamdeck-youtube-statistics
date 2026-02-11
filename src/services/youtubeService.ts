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

export class YoutubeService {
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

    private async fetchJSON<T extends YouTubeError>(url: string): Promise<T> {
        const response = await fetch(url);
        const data = (await response.json()) as T;
        if (!response.ok || data.error) {
            throw new Error(data.error?.message ?? `YouTube API request failed with status ${response.status}`);
        }
        return data;
    }
}
