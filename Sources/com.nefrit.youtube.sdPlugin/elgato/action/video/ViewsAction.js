class ViewsAction extends VideoAction {
    static ACTION_UUID = "com.nefrit.youtube.views"

    getVideoValue(videoStat) {
        return videoStat.viewCount
    }
}