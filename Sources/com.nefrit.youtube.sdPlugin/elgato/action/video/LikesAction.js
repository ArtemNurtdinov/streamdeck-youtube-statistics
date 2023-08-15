class LikesAction {

    static ACTION_UUID = "com.nefrit.youtube.likes"

    constructor(titleUpdater, youtube) {
        this.titleUpdater = titleUpdater
        this.youtube = youtube
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await this.updateViews(context, settings)
    }

    async onWillAppear(context, settings, coordinates) {
        await this.updateViews(context, settings)
    }

    async updateViews(context, settings) {
        var youtubeVideoId = ""
        if (settings != null && settings.hasOwnProperty('youtubeVideoId')) {
            youtubeVideoId = settings["youtubeVideoId"];
        }
        if (!youtubeVideoId) return

        const videoStat = await this.youtube.loadVideoStatistic(youtubeVideoId)
        this.titleUpdater.updateTitle(context, videoStat.likeCount)
    }
}