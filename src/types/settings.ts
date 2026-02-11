export type CommonSettings = {
    apiKey?: string;
    period?: string | number;
};

export type VideoSettings = CommonSettings & {
    youtubeVideo?: string;
};

export type ChannelSettings = CommonSettings & {
    youtubeChannelId?: string;
};

export type StreamSettings = CommonSettings & {
    youtubeChannelId?: string;
};
