class CurrentStreamStatLoader {

    async loadCurrentStreamStat(apiKey, channelId) {

        const liveUrl = "https://www.googleapis.com/youtube/v3/search?part=id&channelId=" + channelId + "&eventType=live&type=video&key=" + apiKey

        const liveResponse = await fetch(liveUrl)
        const liveResponseJSON = await liveResponse.json()
        const liveData = await liveResponseJSON.json()
        if (liveData.items.length > 0) {
            const streamId = liveData.items[0].id.videoId

            const url = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + streamId + "&key=" + apiKey
            const liveStreamingResponse = await fetch(url);
            const liveStreamingData = await liveStreamingResponse.json();
            if (liveStreamingData.items.length > 0) {
                const result = liveStreamingData.items[0].liveStreamingDetails
                const concurrentViewers = result.concurrentViewers
                const scheduledStartTime = result.scheduledStartTime
                const actualStartTime = result.actualStartTime
                const activeLiveChatId = result.activeLiveChatId
                return new StreamStat(concurrentViewers, scheduledStartTime, actualStartTime, activeLiveChatId)
            } else {
                return new StreamStat(0, 0, 0, 0)
            }
        } else {
            return new StreamStat(0, 0, 0, 0)
        }
    }

    async loadCurrentStreamURL(apiKey, channelId) {
        const liveUrl = "https://www.googleapis.com/youtube/v3/search?part=id&channelId=" + channelId + "&eventType=live&type=video&key=" + apiKey
        const liveResponse = await fetch(liveUrl)
        const liveResponseJSON = await liveResponse.json()
        const liveData = await liveResponseJSON.json()

        if (liveData.items.length > 0) {
            return liveData.items[0].id.videoId
        }
        return ""
    }
}