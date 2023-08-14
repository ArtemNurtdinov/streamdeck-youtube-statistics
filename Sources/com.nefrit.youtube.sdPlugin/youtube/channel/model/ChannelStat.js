class ChannelStat {

    constructor(viewCount, subscribersCount, hiddenSubscribersCount, videoCount) {
        self.viewCount = viewCount
        self.subscribersCount = subscribersCount
        self.hiddenSubscribersCount = hiddenSubscribersCount
        self.videoCount = videoCount
    }

    subscribersCount() {
        return self.subscribersCount
    }
}