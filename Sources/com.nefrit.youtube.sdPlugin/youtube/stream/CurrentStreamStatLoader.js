class CurrentStreamStatLoader {

    async loadCurrentStreamStat(apiKey, channelId) {
        const streamId = await this.loadCurrentStreamID(apiKey, channelId)
        if (!streamId) {
            return new StreamStat(false, 0, 0, 0, 0)
        }

        const url = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + streamId + "&key=" + apiKey
        const liveStreamingResponse = await fetch(url);
        const liveStreamingData = await liveStreamingResponse.json();

        if (liveStreamingData.items.length == 0) {
            return new StreamStat(false, 0, 0, 0, 0)
        }

        const result = liveStreamingData.items[0].liveStreamingDetails
        const concurrentViewers = result.concurrentViewers
        const scheduledStartTime = result.scheduledStartTime
        const actualStartTime = result.actualStartTime
        const activeLiveChatId = result.activeLiveChatId
        return new StreamStat(true, concurrentViewers, scheduledStartTime, actualStartTime, activeLiveChatId)
    }

    async loadCurrentStreamID(apiKey, channelId) {
        const liveUrl = "https://www.googleapis.com/youtube/v3/search?part=id&channelId=" + channelId + "&eventType=live&type=video&key=" + apiKey
        const liveResponse = await fetch(liveUrl)
        const liveData = await liveResponse.json()

        if (liveData.items.length > 0) {
            return liveData.items[0].id.videoId
        }
        return ""
    }
}