class SubsAction {

    static ACTION_UUID = "com.nefrit.youtube.subscribers"

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

        var youtubeChannel = ""
        if (settings != null && settings.hasOwnProperty('youtubeChannel')) {
            youtubeChannel = settings["youtubeChannel"];
        }

        const url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + youtubeChannel + "&key=" + apiKey;

        fetch(url)
            .then(response => response.json())
            .then(responseJSON => {
                const subscriberCount = responseJSON.items[0].statistics.subscriberCount;
                elgato.updateTitle(context, subscriberCount)
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