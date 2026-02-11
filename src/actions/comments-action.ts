import { action } from "@elgato/streamdeck";
import { BaseVideoAction } from "./base-video-action.js";
import type { VideoStat } from "../types/stats.js";
import { ACTION_UUIDS } from "../constants/action-uuids.js";

@action({ UUID: ACTION_UUIDS.comments })
export class CommentsAction extends BaseVideoAction {
    protected override getVideoValue(stat: VideoStat): string {
        return stat.commentCount;
    }
}
