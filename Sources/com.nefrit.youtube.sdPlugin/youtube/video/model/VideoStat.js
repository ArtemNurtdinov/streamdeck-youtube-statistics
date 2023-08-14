class VideoStat {

    constructor(viewCount, likeCount, favoriteCount, commentCount) {
        self.viewCount = viewCount
        self.likeCount = likeCount
        self.favoriteCount = favoriteCount
        self.commentCount = commentCount
    }

    viewCount() {
        return self.viewCount
    }

    likeCount() {
        return self.likeCount
    }
}