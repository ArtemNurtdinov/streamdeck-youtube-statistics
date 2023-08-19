class StreamStatLoader {

    async loadStreamStat(apiKey, streamId) {
        const youtubeStreamId = this.getYouTubeStreamId(streamId)

        const url = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + youtubeStreamId + "&key=" + apiKey;

        const response = await fetch(url);
        const responseJSON = await response.json();
        const result = responseJSON.items[0].liveStreamingDetails
        const concurrentViewers = result.concurrentViewers
        const scheduledStartTime = result.scheduledStartTime
        const actualStartTime = result.actualStartTime
        const activeLiveChatId = result.activeLiveChatId

        return new StreamStat(concurrentViewers, scheduledStartTime, actualStartTime, activeLiveChatId)
    }

    getYouTubeStreamId(url) {
        if (url.includes("youtube.com")) {
            const urlParams = new URLSearchParams(new URL(url).search);
            return urlParams.get("v");
        }
        return url
    }
}