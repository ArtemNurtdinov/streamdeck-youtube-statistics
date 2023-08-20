class StreamOnlineAction extends StreamAction {
    static ACTION_UUID = "com.nefrit.youtube.stream.online"

    getStreamValue(streamStat) {
        return streamStat.concurrentViewers
    }
}