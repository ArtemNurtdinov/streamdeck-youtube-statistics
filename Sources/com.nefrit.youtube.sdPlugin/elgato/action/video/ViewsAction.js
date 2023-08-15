class ViewsAction {

    static ACTION_UUID = "com.nefrit.youtube.views"

    constructor(titleUpdater, youtube) {
        this.titleUpdater = titleUpdater
        this.youtube = youtube
        this.interval = null
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await this.updateViews(context, settings)
    }

    async onWillAppear(context, settings, coordinates) {
        this.interval = setInterval(async () => {
            await this.updateViews(context, settings);
        }, 60000);
        await this.updateViews(context, settings)
    }

    async onWillDisappear() {
        clearInterval(this.interval)
    }

    async updateViews(context, settings) {
        var youtubeVideoId = ""
        if (settings != null && settings.hasOwnProperty('youtubeVideoId')) {
            youtubeVideoId = settings["youtubeVideoId"];
        }
        if (!youtubeVideoId) return

        const videoStat = await this.youtube.loadVideoStatistic(youtubeVideoId)
        this.titleUpdater.updateTitle(context, videoStat.viewCount)
    }
}