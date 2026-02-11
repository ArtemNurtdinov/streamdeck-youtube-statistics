export type VideoStat = {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
};

export type ChannelStat = {
    viewCount: string;
    subscribersCount: string;
    hiddenSubscribersCount: boolean;
    videoCount: string;
};

export type StreamStat = {
    concurrentViewers: string;
    scheduledStartTime?: string;
    actualStartTime?: string;
    activeLiveChatId?: string;
};
