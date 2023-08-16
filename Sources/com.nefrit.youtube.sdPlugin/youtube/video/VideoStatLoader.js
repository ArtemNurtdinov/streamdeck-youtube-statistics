class VideoStatLoader {

    async loadVideoStat(apiKey, youtubeVideoId) {
        const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + youtubeVideoId + "&key=" + apiKey;

        console.log(url)
        const response = await fetch(url);
        const responseJSON = await response.json();
        const result = responseJSON.items[0].statistics
        const viewCount = result.viewCount;
        const likeCount = result.likeCount;
        const favoriteCount = result.favoriteCount;
        const commentCount = result.commentCount

        return new VideoStat(viewCount, likeCount, favoriteCount, commentCount)
    }
}