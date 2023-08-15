class VideoAction {

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
        var youtubeVideoId = ""
        if (settings != null && settings.hasOwnProperty('youtubeVideoId')) {
            youtubeVideoId = settings["youtubeVideoId"];
        }
        if (!youtubeVideoId) return

        const channelStat = await this.youtube.loadVideoStatistic(youtubeVideoId);
        this.titleUpdater.updateTitle(context, this.formatNumber(this.getVideoValue(channelStat)));
    }

    getVideoValue(channelStat) {
        return null;
    }

    formatNumber(numberString) {
        let number = parseInt(numberString);

        if (number >= 1000000) {
            number = (number / 1000000).toFixed(2) + "M";
        } else if (number >= 100000) {
            number = (number / 1000).toFixed(1) + "K";
        } else if (number >= 10000) {
            number = (number / 1000).toFixed(2) + "K";
        }

        return number;
    }
}