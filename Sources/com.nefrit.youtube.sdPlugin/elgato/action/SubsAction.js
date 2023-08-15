class SubsAction {

    static ACTION_UUID = "com.nefrit.youtube.subscribers"

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
        var youtubeChannel = ""
        if (settings != null && settings.hasOwnProperty('youtubeChannel')) {
            youtubeChannel = settings["youtubeChannel"];
        }
        if (!youtubeChannel) return

        const channelStat = await self.youtube.loadChannelStat(youtubeChannel)
        self.titleUpdater.updateTitle(context, channelStat.subscribersCount())
    }
}