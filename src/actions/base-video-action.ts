import type { KeyAction } from "@elgato/streamdeck";
import { BaseStatAction } from "./base-stat-action.js";
import { YoutubeService } from "../services/youtubeService.js";
import type { VideoStat } from "../types/stats.js";
import type { VideoSettings } from "../types/settings.js";
import { formatNumber } from "../utils/formatNumber.js";
import { getYouTubeVideoUrl } from "../utils/youtubeUrls.js";

export abstract class BaseVideoAction extends BaseStatAction<VideoSettings> {
    constructor(private readonly youtube: YoutubeService = new YoutubeService()) {
        super();
    }

    protected override async updateTitle(action: KeyAction<VideoSettings>, settings: VideoSettings): Promise<void> {
        const apiKey = settings.apiKey?.trim();
        const video = settings.youtubeVideo?.trim();
        if (!apiKey || !video) {
            await this.setActionTitle(action, "");
            return;
        }

        const stat = await this.youtube.loadVideoStat(apiKey, video);
        await this.setActionTitle(action, formatNumber(this.getVideoValue(stat)));
    }

    protected override getActionUrl(settings: VideoSettings): string | null {
        const video = settings.youtubeVideo?.trim();
        if (!video) {
            return null;
        }
        return getYouTubeVideoUrl(video);
    }

    protected abstract getVideoValue(stat: VideoStat): string;
}
