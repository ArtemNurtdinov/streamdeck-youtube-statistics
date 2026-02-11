import streamDeck, {
    type DidReceiveSettingsEvent,
    type KeyAction,
    type KeyUpEvent,
    SingletonAction,
    Target,
    type WillAppearEvent,
    type WillDisappearEvent,
} from "@elgato/streamdeck";
import type { JsonObject } from "@elgato/utils";
import type { CommonSettings } from "../types/settings.js";

const DEFAULT_PERIOD_MS = 300000;
const MIN_PERIOD_MS = 60000;

export abstract class BaseStatAction<TSettings extends CommonSettings & JsonObject> extends SingletonAction<TSettings> {
    private readonly timers = new Map<string, NodeJS.Timeout>();

    override async onWillAppear(ev: WillAppearEvent<TSettings>): Promise<void> {
        const action = ev.action as KeyAction<TSettings>;
        await this.refreshInstance(action, ev.payload.settings);
        this.startTimer(action, ev.payload.settings);
    }

    override onWillDisappear(ev: WillDisappearEvent<TSettings>): void {
        this.stopTimer(ev.action.id);
    }

    override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<TSettings>): Promise<void> {
        const action = ev.action as KeyAction<TSettings>;
        this.stopTimer(action.id);
        await this.refreshInstance(action, ev.payload.settings);
        this.startTimer(action, ev.payload.settings);
    }

    override async onKeyUp(ev: KeyUpEvent<TSettings>): Promise<void> {
        const url = this.getActionUrl(ev.payload.settings);
        if (!url) {
            return;
        }
        await streamDeck.system.openUrl(url);
    }

    protected abstract updateTitle(action: KeyAction<TSettings>, settings: TSettings): Promise<void>;

    protected abstract getActionUrl(settings: TSettings): string | null;

    private startTimer(action: KeyAction<TSettings>, settings: TSettings): void {
        if (this.timers.has(action.id)) {
            return;
        }

        const periodMs = this.getPeriod(settings);
        const timer = setInterval(async () => {
            const latestSettings = await action.getSettings<TSettings>();
            await this.refreshInstance(action, latestSettings);
        }, periodMs);

        this.timers.set(action.id, timer);
    }

    private stopTimer(actionId: string): void {
        const timer = this.timers.get(actionId);
        if (!timer) {
            return;
        }
        clearInterval(timer);
        this.timers.delete(actionId);
    }

    private getPeriod(settings: TSettings): number {
        const parsed = Number.parseInt(String(settings.period ?? ""), 10);
        if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < 1) {
            return DEFAULT_PERIOD_MS;
        }

        const periodMs = parsed * 60000;
        if (!Number.isFinite(periodMs) || periodMs < MIN_PERIOD_MS) {
            return DEFAULT_PERIOD_MS;
        }

        return periodMs;
    }

    private async refreshInstance(action: KeyAction<TSettings>, settings: TSettings): Promise<void> {
        try {
            await this.updateTitle(action, settings);
        } catch (error) {
            streamDeck.logger.error(`[${action.manifestId}] refresh failed`, error);
            await action.showAlert();
        }
    }

    protected async setActionTitle(action: KeyAction<TSettings>, title?: string): Promise<void> {
        await action.setTitle(title, { target: Target.HardwareAndSoftware });
    }
}
