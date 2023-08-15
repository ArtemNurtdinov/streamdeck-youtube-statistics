class LikesAction extends VideoAction {
    static ACTION_UUID = "com.nefrit.youtube.likes"


    getVideoValue(videoStat) {
        return videoStat.likeCount;
    }
}