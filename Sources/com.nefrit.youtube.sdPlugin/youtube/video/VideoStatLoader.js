class VideoStatLoader {

    constructor(apiKey) {
        this.apiKey = apiKey
    }

    async loadVideoStat(youtubeVideoId) {
        const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + youtubeVideoId + "&key=" + this.apiKey;

        const response = await fetch(url);
        const responseJSON = await response.json();
        const result = responseJSON.items[0].statistics
        const viewCount = result.viewCount;
        const likeCount = result.likeCount;
        const favoriteCount = result.favoriteCount;
        const commentCount = result.commentCount

        return new VideoStat(viewCount, likeCount, favoriteCount, commentCount)
    }

    async loadVideoPreview(youtubeVideoId) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeVideoId}&key=${this.apiKey}`;

        const response = await fetch(url);
        const responseJSON = await response.json();
        const previewUrl = responseJSON.items[0].snippet.thumbnails.high.url;

        return new VideoPreview(previewUrl);
    }
}

class VideoPreview {
    constructor(previewUrl) {
        this.previewUrl = previewUrl;
    }
}