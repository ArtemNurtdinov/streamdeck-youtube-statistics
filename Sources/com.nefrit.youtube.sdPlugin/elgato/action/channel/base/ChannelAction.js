class ChannelAction extends BaseAction {

    constructor(titleUpdater, urlOpener, youtube) {
        super();
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.urlOpener = urlOpener
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
        await super.onKeyDown(context, settings, coordinates, userDesiredState);
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await super.onKeyUp(context, settings, coordinates, userDesiredState)
        let youtubeChannel = this.getYoutubeChannel(settings)
        if (!youtubeChannel) return;
        const url = this.youtube.getYoutubeChannelURL(youtubeChannel)
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

    async updateViews(context, settings) {
        await super.updateViews(context, settings)
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