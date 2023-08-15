const apiKey = "AIzaSyB08u73xxNw0Vaire72STS28m4CZ8iD5y0";

class Youtube {

    constructor() {
        self.apiKey = apiKey
        self.videoStatLoader = new VideoStatLoader(apiKey)
        self.channelStatLoader = new ChannelStatLoader(apiKey)
    }

    loadVideoStatistic(videoId) {
        return self.videoStatLoader.loadVideoStat(videoId)
    }

    loadChannelStat(channelId) {
        return self.channelStatLoader.loadChannelStat(channelId)
    }
}