class ChannelAction extends BaseAction {

    constructor(titleUpdater, urlOpener, youtube) {
        super();
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.urlOpener = urlOpener
        this.interval = null;
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {}

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        let youtubeChannel = this.getYoutubeChannel(settings)
        if (!youtubeChannel) return;
        const url = this.youtube.getYoutubeChannelURL(youtubeChannel)
        this.urlOpener.open(url)
    }

    async onWillAppear(context, settings, coordinates) {
        this.interval = setInterval(async () => {
            await this.updateViews(context, settings);
        }, 180000);
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
        const apiKey = this.getYouTubeAPIKey(settings)
        const youtubeChannel = this.getYoutubeChannel(settings)
        if (!youtubeChannel || !apiKey) return;

        const channelStat = await this.youtube.loadChannelStat(apiKey, youtubeChannel);
        this.titleUpdater.updateTitle(context, this.formatNumber(this.getChannelValue(channelStat)));
    }

    getChannelValue(channelStat) {
        return null;
    }

    getYoutubeChannel(settings) {
        let youtubeChannel = "";
        if (settings.hasOwnProperty("youtubeChannelId")) {
            youtubeChannel = settings["youtubeChannelId"];
        }
        return youtubeChannel
    }
}