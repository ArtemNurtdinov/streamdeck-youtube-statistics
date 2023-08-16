class Youtube {

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
}