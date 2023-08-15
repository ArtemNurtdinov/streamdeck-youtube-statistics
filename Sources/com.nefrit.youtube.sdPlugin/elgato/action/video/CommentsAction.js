class CommentsAction extends VideoAction {
    static ACTION_UUID = "com.nefrit.youtube.comments";

    getVideoValue(videoStat) {
        return videoStat.commentCount;
    }
}