class SubsAction extends ChannelAction {
    static ACTION_UUID = "com.nefrit.youtube.subscribers";

    getChannelValue(channelStat) {
        return channelStat.subscribersCount;
    }
}