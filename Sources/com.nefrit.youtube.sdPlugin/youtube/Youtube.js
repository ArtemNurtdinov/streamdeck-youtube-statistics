class Youtube {

    VIDEO_URL_FORMAT = 'https://www.youtube.com/watch?v='
    CHANNEL_URL_FORMAT = 'https://www.youtube.com/channel/'

    constructor() {
        this.videoStatLoader = new VideoStatLoader()
        this.channelStatLoader = new ChannelStatLoader()
        this.streamStatLoader = new StreamStatLoader()
        this.currentStreamStatLoader = new CurrentStreamStatLoader()
    }

    async loadVideoStatistic(apiKey, video) {
        return this.videoStatLoader.loadVideoStat(apiKey, video)
    }

    async loadChannelStat(apiKey, channelId) {
        return this.channelStatLoader.loadChannelStat(apiKey, channelId)
    }

    async loadStreamStatistic(apiKey, streamId) {
        return this.streamStatLoader.loadStreamStat(apiKey, streamId)
    }

    async loadCurrentStreamStatistic(apiKey, channelId) {
        return this.currentStreamStatLoader.loadCurrentStreamStat(apiKey, channelId)
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

    async getCurrentStreamUrlByChannelId(apiKey, channelId) {
        const streamId = await this.currentStreamStatLoader.loadCurrentStreamID(apiKey, channelId)
        return this.VIDEO_URL_FORMAT + streamId
    }
}