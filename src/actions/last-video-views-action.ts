import type { KeyAction } from "@elgato/streamdeck";
import { action } from "@elgato/streamdeck";
import { BaseStatAction } from "./base-stat-action.js";
import { ACTION_UUIDS } from "../constants/action-uuids.js";
import type { ChannelSettings } from "../types/settings.js";
import { YoutubeService } from "../services/youtubeService.js";
import { formatNumber } from "../utils/formatNumber.js";
import { getYouTubeChannelUrl } from "../utils/youtubeUrls.js";

@action({ UUID: ACTION_UUIDS.lastVideoViews })
export class LastVideoViewsAction extends BaseStatAction<ChannelSettings> {
    constructor(private readonly youtube: YoutubeService = new YoutubeService()) {
        super();
    }

    protected override async updateTitle(action: KeyAction<ChannelSettings>, settings: ChannelSettings): Promise<void> {
        const apiKey = settings.apiKey?.trim();
        const channelId = settings.youtubeChannelId?.trim();
        if (!apiKey || !channelId) {
            await this.setActionTitle(action, "");
            return;
        }

        const latestVideo = await this.youtube.loadLatestVideo(apiKey, channelId);
        await this.setActionTitle(action, formatNumber(latestVideo.viewCount));
    }

    protected override getActionUrl(settings: ChannelSettings): string | null {
        const channelId = settings.youtubeChannelId?.trim();
        if (!channelId) {
            return null;
        }
        return getYouTubeChannelUrl(channelId);
    }
}
