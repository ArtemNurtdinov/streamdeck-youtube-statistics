import { action } from "@elgato/streamdeck";
import { BaseStreamAction } from "./base-stream-action.js";
import type { StreamStat } from "../types/stats.js";
import { ACTION_UUIDS } from "../constants/action-uuids.js";

@action({ UUID: ACTION_UUIDS.streamOnline })
export class StreamOnlineAction extends BaseStreamAction {
    protected override getStreamValue(stat: StreamStat): string {
        return stat.concurrentViewers ?? "0";
    }
}
