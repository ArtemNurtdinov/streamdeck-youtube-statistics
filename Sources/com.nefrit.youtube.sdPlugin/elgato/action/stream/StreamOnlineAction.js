class StreamOnlineAction extends StreamAction {
    static ACTION_UUID = "com.nefrit.youtube.stream.online"

    async updateViews(context, settings) {
        return super.updateViews(context, settings);
    }

    getStreamValue(streamStat) {
        return streamStat.concurrentViewers
    }
}