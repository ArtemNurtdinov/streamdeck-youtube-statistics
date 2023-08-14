class SubsAction {

    static ACTION_UUID = "com.nefrit.youtube.subscribers"

    constructor(apiKey, elgato) {
        self.apiKey = apiKey
        self.elgato = elgato
        self.channelStatLoader = new ChannelStatLoader(apiKey)
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

        const channelStat = await self.channelStatLoader.loadChannelStat(youtubeChannel)
        self.elgato.updateTitle(context, channelStat.subscribersCount())
    }
}