class ViewsAction {

    static ACTION_UUID = "com.nefrit.youtube.views"

    constructor(apiKey, elgato) {
        self.apiKey = apiKey
        self.elgato = elgato
        self.videoStatLoader = new VideoStatLoader(apiKey)
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

        const videoStat = await self.videoStatLoader.loadVideoStat(youtubeVideoId)
        self.elgato.updateTitle(context, videoStat.viewCount())
    }
}