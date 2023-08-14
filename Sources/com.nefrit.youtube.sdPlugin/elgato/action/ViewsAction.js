class ViewsAction {

    static ACTION_UUID = "com.nefrit.youtube.views"

    constructor(apiKey) {
        self.apiKey = apiKey
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
        clearTimeout(timer);

        var youtubeVideoId = ""
        if (settings != null && settings.hasOwnProperty('youtubeVideoId')) {
            youtubeVideoId = settings["youtubeVideoId"];
        }
        if (!youtubeVideoId) return

        const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + youtubeVideoId + "&key=" + self.apiKey;
        fetch(url)
            .then(response => response.json())
            .then(responseJSON => {
                const viewCount = responseJSON.items[0].statistics.viewCount;
                elgato.updateTitle(context, viewCount)
            })
            .catch(error => {
                elgato.updateTitle(context, "Ошибка")
            });

        const timerFunc = () => {
            timer = setTimeout(() => {
                this.updateViews(context, settings);
            }, 60000);
        };
        timerFunc();
    }
}