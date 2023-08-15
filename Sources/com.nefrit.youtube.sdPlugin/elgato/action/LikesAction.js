class LikesAction {

    static ACTION_UUID = "com.nefrit.youtube.likes"

    constructor(apiKey, titleUpdater, youtube) {
        self.apiKey = apiKey
        self.titleUpdater = titleUpdater
        self.youtube = youtube
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

        const videoStat = await self.youtube.loadVideoStatistic(youtubeVideoId)
        self.titleUpdater.updateTitle(context, videoStat.likeCount())
    }
}