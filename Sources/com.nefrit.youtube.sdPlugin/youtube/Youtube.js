const apiKey = "AIzaSyB08u73xxNw0Vaire72STS28m4CZ8iD5y0";

class Youtube {

    constructor() {
        this.videoStatLoader = new VideoStatLoader()
        this.channelStatLoader = new ChannelStatLoader()
    }

    loadVideoStatistic(apiKey, videoId) {
        return this.videoStatLoader.loadVideoStat(apiKey, videoId)
    }

    loadChannelStat(apiKey, channelId) {
        return this.channelStatLoader.loadChannelStat(apiKey, channelId)
    }
}