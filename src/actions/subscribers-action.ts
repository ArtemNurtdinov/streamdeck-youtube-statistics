import { action } from "@elgato/streamdeck";
import { BaseChannelAction } from "./base-channel-action.js";
import type { ChannelStat } from "../types/stats.js";
import { ACTION_UUIDS } from "../constants/action-uuids.js";

@action({ UUID: ACTION_UUIDS.subscribers })
export class SubscribersAction extends BaseChannelAction {
    protected override getChannelValue(stat: ChannelStat): string {
        return stat.subscribersCount;
    }
}
