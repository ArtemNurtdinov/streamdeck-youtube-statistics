class SubsAction {

    static ACTION_UUID = "com.nefrit.youtube.subscribers"

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
        console.log("update subs")

        var youtubeChannel = ""
        if (settings != null && settings.hasOwnProperty('youtubeChannel')) {
            youtubeChannel = settings["youtubeChannel"];
        }
        if (!youtubeChannel) return

        const url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + youtubeChannel + "&key=" + apiKey;

        fetch(url)
            .then(response => response.json())
            .then(responseJSON => {
                const subscriberCount = responseJSON.items[0].statistics.subscriberCount;
                self.elgato.updateTitle(context, subscriberCount)
            })
            .catch(error => {
                self.elgato.updateTitle(context, "Ошибка")
            });
    }
}