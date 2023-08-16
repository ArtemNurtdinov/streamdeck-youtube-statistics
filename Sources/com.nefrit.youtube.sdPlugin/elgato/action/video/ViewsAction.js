class ViewsAction extends VideoAction {
    static ACTION_UUID = "com.nefrit.youtube.views"

    async updateViews(context, settings) {
        return super.updateViews(context, settings);
    }

    getVideoValue(videoStat) {
        return videoStat.viewCount
    }
}