class CurrentStreamAction extends BaseAction {
    static ACTION_UUID = "com.nefrit.youtube.current.stream.online"

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
        const apiKey = this.getYouTubeAPIKey(settings)
        let youtubeChannel = this.getYoutubeChannel(settings)
        if (!apiKey && !youtubeChannel) return;
        const url = await this.youtube.getCurrentStreamUrlByChannelId(apiKey, youtubeChannel)
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

    getStreamValue(streamStat) {
        return streamStat.concurrentViewers
    }

    async updateViews(context, settings) {
        await super.updateViews(context, settings)
        if (settings == null) return
        const apiKey = this.getYouTubeAPIKey(settings)
        let youtubeChannel = this.getYoutubeChannel(settings)
        if (!youtubeChannel && !apiKey) return

        const streamStat = await this.youtube.loadCurrentStreamStatistic(apiKey, youtubeChannel)
        this.titleUpdater.updateTitle(context, this.formatNumber(this.getStreamValue(streamStat)))
    }
}