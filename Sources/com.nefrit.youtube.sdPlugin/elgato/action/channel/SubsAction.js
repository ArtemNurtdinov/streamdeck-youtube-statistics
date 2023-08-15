class SubsAction {

    static ACTION_UUID = "com.nefrit.youtube.subscribers"

    constructor(titleUpdater, youtube) {
        this.youtube = youtube
        this.titleUpdater = titleUpdater
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {
    }

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await this.updateViews(context, settings)
    }

    async onWillAppear(context, settings, coordinates) {
        await this.updateViews(context, settings)
    }

    async onWillDisappear() {
    }

    async updateViews(context, settings) {
        var youtubeChannel = ""
        if (settings != null && settings.hasOwnProperty('youtubeChannel')) {
            youtubeChannel = settings["youtubeChannel"];
        }
        if (!youtubeChannel) return

        const channelStat = await this.youtube.loadChannelStat(youtubeChannel)
        this.titleUpdater.updateTitle(context, channelStat.subscribersCount)
    }
}