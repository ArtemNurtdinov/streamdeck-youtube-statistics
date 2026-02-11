import type { KeyAction } from "@elgato/streamdeck";
import { BaseStatAction } from "./base-stat-action.js";
import { YoutubeService } from "../services/youtubeService.js";
import type { StreamStat } from "../types/stats.js";
import type { StreamSettings } from "../types/settings.js";
import { formatNumber } from "../utils/formatNumber.js";
import { getYouTubeStreamUrl } from "../utils/youtubeUrls.js";

export abstract class BaseStreamAction extends BaseStatAction<StreamSettings> {
    constructor(private readonly youtube: YoutubeService = new YoutubeService()) {
        super();
    }

    protected override async updateTitle(action: KeyAction<StreamSettings>, settings: StreamSettings): Promise<void> {
        const apiKey = settings.apiKey?.trim();
        const stream = settings.youtubeStream?.trim();
        if (!apiKey || !stream) {
            await this.setActionTitle(action, "");
            return;
        }

        const stat = await this.youtube.loadStreamStat(apiKey, stream);
        await this.setActionTitle(action, formatNumber(this.getStreamValue(stat)));
    }

    protected override getActionUrl(settings: StreamSettings): string | null {
        const stream = settings.youtubeStream?.trim();
        if (!stream) {
            return null;
        }
        return getYouTubeStreamUrl(stream);
    }

    protected abstract getStreamValue(stat: StreamStat): string;
}
