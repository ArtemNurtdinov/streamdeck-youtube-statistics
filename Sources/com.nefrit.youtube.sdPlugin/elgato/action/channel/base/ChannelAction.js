class ChannelAction {

    constructor(titleUpdater, youtube) {
        this.youtube = youtube;
        this.titleUpdater = titleUpdater;
        this.interval = null;
    }

    async onKeyDown(context, settings, coordinates, userDesiredState) {}

    async onKeyUp(context, settings, coordinates, userDesiredState) {
        await this.updateViews(context, settings);
    }

    async onWillAppear(context, settings, coordinates) {
        this.interval = setInterval(async () => {
            await this.updateViews(context, settings);
        }, 60000);
        await this.updateViews(context, settings);
    }

    async onWillDisappear() {
        clearInterval(this.interval);
    }

    async updateViews(context, settings) {
        var youtubeChannel = "";
        if (settings != null && settings.hasOwnProperty("youtubeChannel")) {
            youtubeChannel = settings["youtubeChannel"];
        }
        if (!youtubeChannel) return;

        const channelStat = await this.youtube.loadChannelStat(youtubeChannel);
        this.titleUpdater.updateTitle(context, this.getChannelValue(channelStat));
    }

    getChannelValue(channelStat) {
        return null;
    }
}