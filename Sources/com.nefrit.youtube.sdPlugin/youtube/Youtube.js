const apiKey = "AIzaSyB08u73xxNw0Vaire72STS28m4CZ8iD5y0";

class Youtube {

    constructor() {
        this.videoStatLoader = new VideoStatLoader(apiKey)
        this.channelStatLoader = new ChannelStatLoader(apiKey)
    }

    loadVideoStatistic(videoId) {
        return this.videoStatLoader.loadVideoStat(videoId)
    }

    loadChannelStat(channelId) {
        return this.channelStatLoader.loadChannelStat(channelId)
    }
}