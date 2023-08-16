class ChannelAction {

    constructor(titleUpdater, youtube) {
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.interval = null;
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {}

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await this.updateViews(context, settings);
    }

    async onWillAppear(context, settings, coordinates) {
        this.interval = setInterval(async () => {
            await this.updateViews(context, settings);
        }, 60000);
        await this.updateViews(context, settings);
    }

    async onWillDisappear() {
        clearInterval(this.interval);
    }

    async didReceiveSettings(context, settings) {
        await this.updateViews(context, settings);
    }

    async updateViews(context, settings) {
        if (settings == null) return
        var apiKey = ""
        if (settings.hasOwnProperty('apiKey')) {
            apiKey = settings["apiKey"];
        }
        var youtubeChannel = "";
        if (settings.hasOwnProperty("youtubeChannel")) {
            youtubeChannel = settings["youtubeChannel"];
        }
        if (!youtubeChannel || !apiKey) return;

        const channelStat = await this.youtube.loadChannelStat(apiKey, youtubeChannel);
        this.titleUpdater.updateTitle(context, this.formatNumber(this.getChannelValue(channelStat)));
    }

    getChannelValue(channelStat) {
        return null;
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