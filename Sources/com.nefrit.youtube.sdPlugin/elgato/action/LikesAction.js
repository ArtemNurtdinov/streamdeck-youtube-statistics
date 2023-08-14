class LikesAction {

    static ACTION_UUID = "com.nefrit.youtube.likes"

    constructor(apiKey, elgato) {
        self.apiKey = apiKey
        self.elgato = elgato
    }

    onKeyDown(context, settings, coordinates, userDesiredState) {
    }

    onKeyUp(context, settings, coordinates, userDesiredState) {
        this.updateViews(context, settings)
    }

    onWillAppear(context, settings, coordinates) {
        this.updateViews(context, settings)
    }

    updateViews(context, settings) {
        console.log("update likes")

        var youtubeVideoId = ""
        if (settings != null && settings.hasOwnProperty('youtubeVideoId')) {
            youtubeVideoId = settings["youtubeVideoId"];
        }
        if (!youtubeVideoId) return

        const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + youtubeVideoId + "&key=" + apiKey;

        fetch(url)
            .then(response => response.json())
            .then(responseJSON => {
                const viewCount = responseJSON.items[0].statistics.likeCount;
                self.elgato.updateTitle(context, viewCount)
            })
            .catch(error => {
                self.elgato.updateTitle(context, "Ошибка")
            });
    }
}