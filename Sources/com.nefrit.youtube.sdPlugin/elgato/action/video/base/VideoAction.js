class VideoAction extends BaseAction {

    constructor(titleUpdater, urlOpener, youtube) {
        super();
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.urlOpener = urlOpener
        this.interval = null;
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {}

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        let youtubeVideo = this.getYoutubeVideo(settings)
        if (!youtubeVideo) return
        const url = this.youtube.getYoutubeVideoURL(youtubeVideo)
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
        const youtubeVideo = this.getYoutubeVideo(settings)
        if (!youtubeVideo || !apiKey) return

        const videoStat = await this.youtube.loadVideoStatistic(apiKey, youtubeVideo);
        this.titleUpdater.updateTitle(context, this.formatNumber(this.getVideoValue(videoStat)));
    }

    getVideoValue(channelStat) {
        return null;
    }

    getYoutubeVideo(settings) {
        let youtubeVideo = "";
        if (settings.hasOwnProperty('youtubeVideo')) {
            youtubeVideo = settings["youtubeVideo"];
        }
        return youtubeVideo
    }
}