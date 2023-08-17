class Youtube {

    VIDEO_URL_FORMAT = 'https://www.youtube.com/watch?v='
    CHANNEL_URL_FORMAT = 'https://www.youtube.com/channel/'

    constructor() {
        this.videoStatLoader = new VideoStatLoader()
        this.channelStatLoader = new ChannelStatLoader()
    }

    loadVideoStatistic(apiKey, video) {
        return this.videoStatLoader.loadVideoStat(apiKey, video)
    }

    loadChannelStat(apiKey, channelId) {
        return this.channelStatLoader.loadChannelStat(apiKey, channelId)
    }

    getYoutubeVideoURL(youtubeVideo) {
        if (youtubeVideo.includes("youtube.com")) {
            return youtubeVideo
        }
        return this.VIDEO_URL_FORMAT + youtubeVideo
    }

    getYoutubeChannelURL(youtubeChannel) {
        return this.CHANNEL_URL_FORMAT + youtubeChannel
    }
}