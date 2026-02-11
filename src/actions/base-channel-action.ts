import type { KeyAction } from "@elgato/streamdeck";
import { BaseStatAction } from "./base-stat-action.js";
import { YoutubeService } from "../services/youtubeService.js";
import type { ChannelStat } from "../types/stats.js";
import type { ChannelSettings } from "../types/settings.js";
import { formatNumber } from "../utils/formatNumber.js";
import { getYouTubeChannelUrl } from "../utils/youtubeUrls.js";

export abstract class BaseChannelAction extends BaseStatAction<ChannelSettings> {
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

        const stat = await this.youtube.loadChannelStat(apiKey, channelId);
        await this.setActionTitle(action, formatNumber(this.getChannelValue(stat)));
    }

    protected override getActionUrl(settings: ChannelSettings): string | null {
        const channelId = settings.youtubeChannelId?.trim();
        if (!channelId) {
            return null;
        }
        return getYouTubeChannelUrl(channelId);
    }

    protected abstract getChannelValue(stat: ChannelStat): string;
}
