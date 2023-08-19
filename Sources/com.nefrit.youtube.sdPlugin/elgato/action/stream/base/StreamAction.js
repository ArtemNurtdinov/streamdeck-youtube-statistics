class StreamAction extends BaseAction {

    constructor(titleUpdater, urlOpener, youtube) {
        super();
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.urlOpener = urlOpener
        this.interval = null;
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {}

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        let youtubeStream = this.getYoutubeStream(settings)
        if (!youtubeStream) return
        const url = this.youtube.getYoutubeStreamURL(youtubeStream)
        this.urlOpener.open(url)
    }

    getStreamValue(channelStat) {
        return null;
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
        const youtubeStream = this.getYoutubeStream(settings)
        if (!youtubeStream || !apiKey) return

        const streamStat = await this.youtube.loadStreamStatistic(apiKey, youtubeStream);
        this.titleUpdater.updateTitle(context, this.formatNumber(this.getStreamValue(streamStat)));
    }

    getYoutubeStream(settings) {
        let youtubeVideo = "";
        if (settings.hasOwnProperty('youtubeStream')) {
            youtubeVideo = settings["youtubeStream"];
        }
        return youtubeVideo
    }
}