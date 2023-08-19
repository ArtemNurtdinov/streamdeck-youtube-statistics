class Youtube {

    VIDEO_URL_FORMAT = 'https://www.youtube.com/watch?v='
    CHANNEL_URL_FORMAT = 'https://www.youtube.com/channel/'

    constructor() {
        this.videoStatLoader = new VideoStatLoader()
        this.channelStatLoader = new ChannelStatLoader()
        this.streamStatLoader = new StreamStatLoader()
    }

    loadVideoStatistic(apiKey, video) {
        return this.videoStatLoader.loadVideoStat(apiKey, video)
    }

    loadChannelStat(apiKey, channelId) {
        return this.channelStatLoader.loadChannelStat(apiKey, channelId)
    }

    loadStreamStatistic(apiKey, streamId) {
        return this.streamStatLoader.loadStreamStat(apiKey, streamId)
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

    getYoutubeStreamURL(youtubeStream) {
        if (youtubeStream.includes("youtube.com")) {
            return youtubeStream
        }
        return this.VIDEO_URL_FORMAT + youtubeStream
    }
}