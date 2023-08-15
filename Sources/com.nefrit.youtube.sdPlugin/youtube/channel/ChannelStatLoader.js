class ChannelStatLoader {

    constructor(apiKey) {
        this.apiKey = apiKey
    }

    async loadChannelStat(channelId) {
        const url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + this.apiKey;

        const response = await fetch(url);
        const responseJSON = await response.json();
        const result = responseJSON.items[0].statistics
        const viewCount = result.viewCount;
        const subscribersCount = result.subscriberCount;
        const hiddenSubscribersCount = result.hiddenSubscribersCount;
        const videoCount = result.videoCount
        return new ChannelStat(viewCount, subscribersCount, hiddenSubscribersCount, videoCount);
    }
}