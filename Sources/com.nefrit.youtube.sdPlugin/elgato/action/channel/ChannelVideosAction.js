class ChannelVideosAction extends ChannelAction {
    static ACTION_UUID = "com.nefrit.youtube.channel.videos";

    getChannelValue(channelStat) {
        return channelStat.videoCount;
    }
}