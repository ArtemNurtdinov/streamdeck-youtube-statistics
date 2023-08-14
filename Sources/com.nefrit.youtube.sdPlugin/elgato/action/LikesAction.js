class LikesAction {

    static ACTION_UUID = "com.nefrit.youtube.likes"

    constructor(apiKey, elgato) {
        self.apiKey = apiKey
        self.elgato = elgato
        self.videoStatLoader = new VideoStatLoader(apiKey)
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        this.updateViews(context, settings)
    }

    async onWillAppear(context, settings, coordinates) {
        this.updateViews(context, settings)
    }

    async updateViews(context, settings) {
        console.log("update likes")
        var youtubeVideoId = ""
        if (settings != null && settings.hasOwnProperty('youtubeVideoId')) {
            youtubeVideoId = settings["youtubeVideoId"];
        }
        if (!youtubeVideoId) return

        const videoStat = await self.videoStatLoader.loadVideoStat(youtubeVideoId)
        self.elgato.updateTitle(context, videoStat.likeCount())
    }
}