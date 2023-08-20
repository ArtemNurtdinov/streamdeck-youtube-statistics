class BaseAction {

    constructor() {
        this.timers = new Map()
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

    async onWillAppear(context, settings, coordinates) {
        await this.setTimer(context, settings)
        await this.updateViews(context, settings);
    }

    async onWillDisappear(context, settings, coordinates) {
        await this.clearTimer(context, settings)
    }

    async didReceiveSettings(context, settings) {
        await this.updateViews(context, settings);
    }

    async updateViews(context, settings) {
    }

    async setTimer(context, settings) {
        if (this.timers.has(context)) {
            return
        }
        const interval = setInterval(async () => {
            await this.updateViews(context, settings)
        }, 180000)

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
}