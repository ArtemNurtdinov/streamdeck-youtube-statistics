class VideoStatLoader {

    async loadVideoStat(apiKey, youtubeVideo) {
        const youtubeVideoId = this.getYouTubeVideoId(youtubeVideo)

        const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + youtubeVideoId + "&key=" + apiKey;

        const response = await fetch(url);
        const responseJSON = await response.json();
        const result = responseJSON.items[0].statistics
        const viewCount = result.viewCount;
        const likeCount = result.likeCount;
        const favoriteCount = result.favoriteCount;
        const commentCount = result.commentCount

        return new VideoStat(viewCount, likeCount, favoriteCount, commentCount)
    }

    getYouTubeVideoId(url) {
        if (url.includes("youtube.com")) {
            const urlParams = new URLSearchParams(new URL(url).search);
            return urlParams.get("v");
        }
        return url
    }
}