class ChannelViewsAction extends ChannelAction {
    static ACTION_UUID = "com.nefrit.youtube.channel.views";

    getChannelValue(channelStat) {
        return channelStat.viewCount;
    }
}