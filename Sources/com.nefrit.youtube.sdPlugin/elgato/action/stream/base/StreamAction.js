class StreamAction extends BaseAction {

    constructor(titleUpdater, urlOpener, youtube) {
        super();
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.urlOpener = urlOpener
        this.interval = null;
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
        await super.onKeyDown(context, settings, coordinates, userDesiredState);
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await super.onKeyUp(context, settings, coordinates, userDesiredState)
        let youtubeStream = this.getYoutubeStream(settings)
        if (!youtubeStream) return
        const url = this.youtube.getYoutubeStreamURL(youtubeStream)
        this.urlOpener.open(url)
    }

    async onWillAppear(context, settings, coordinates) {
        await super.onWillAppear(context, settings, coordinates)
    }

    async onWillDisappear(context, settings, coordinates) {
        await super.onWillDisappear(context, settings, coordinates)
    }

    async didReceiveSettings(context, settings) {
        await super.didReceiveSettings(context, settings)
    }

    getStreamValue(channelStat) {
        return null;
    }

    async updateViews(context, settings) {
        await super.updateViews(context, settings)
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