class BaseAction {

    static ACTION_EVENT_KEY_DOWN = "keyDown"
    static ACTION_EVENT_KEY_UP = "keyUp"
    static ACTION_EVENT_WILL_APPEAR = "willAppear"
    static ACTION_EVENT_WILL_DISAPPEAR = "willDisappear"
    static ACTION_EVENT_DID_RECEIVE_SETTINGS = "didReceiveSettings"

    constructor() {
        this.timers = new Map()
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
    }

    async onWillAppear(context, settings, coordinates) {
        await this.createTimer(context, settings)
        await this.updateViews(context, settings);
    }

    async onWillDisappear(context, settings, coordinates) {
        await this.clearTimer(context, settings)
    }

    async didReceiveSettings(context, settings) {
        await this.updateTimer(context, settings);
        await this.updateViews(context, settings);
    }

    async updateViews(context, settings) {
    }

    async updateTimer(context, settings) {
        await this.clearTimer(context, settings)
        await this.createTimer(context, settings)
    }

    async createTimer(context, settings) {
        if (this.timers.has(context)) {
            return
        }
        let period = 0;
        if (settings.hasOwnProperty('period')) {
            period = settings["period"] * 60000;
        }
        if (period < 60000) period = 300000
        const interval = setInterval(async () => {
            await this.updateViews(context, settings)
        }, period)

        this.timers.set(context, interval)
    }

    async clearTimer(context, settings) {
        if (!this.timers.has(context)) {
            return
        }
        const interval = this.timers.get(context)
        clearInterval(interval)
        this.timers.delete(context)
    }

    getYouTubeAPIKey(settings) {
        let apiKey = "";
        if (settings.hasOwnProperty('apiKey')) {
            apiKey = settings["apiKey"];
        }
        return apiKey
    }

    formatNumber(numberString) {
        let number = parseInt(numberString);

        if (number >= 1000000) {
            number = (number / 1000000).toFixed(2) + "M";
        } else if (number >= 100000) {
            number = (number / 1000).toFixed(1) + "K";
        } else if (number >= 10000) {
            number = (number / 1000).toFixed(2) + "K";
        }

        return number;
    }
}