class BaseAction {

    getYouTubeAPIKey(settings) {
        let apiKey = "";
        if (settings.hasOwnProperty('apiKey')) {
            apiKey = settings["apiKey"];
        }
        return apiKey
    }

    formatNumber(numberString) {
        let number = parseInt(numberString);

        if (number >= 1000000) {
            number = (number / 1000000).toFixed(2) + "M";
        } else if (number >= 100000) {
            number = (number / 1000).toFixed(1) + "K";
        } else if (number >= 10000) {
            number = (number / 1000).toFixed(2) + "K";
        }

        return number;
    }
}