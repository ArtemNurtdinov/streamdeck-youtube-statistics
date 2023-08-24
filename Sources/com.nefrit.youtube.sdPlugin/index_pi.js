$PI.onConnected(jsn => {
    console.log('Property Inspector connected', jsn);
    initPropertyInspector();
    console.log(jsn.actionInfo.payload.settings);
    Object.entries(jsn.actionInfo.payload.settings).forEach(([key, value]) => {
        console.log('setting', key, value);
        const el = document.getElementById(key);
        if (el) {
            el.value = value;
        }
    });
});

function saveYoutubeVideoClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const period = document.getElementById('period').value;
    const youtubeVideo = document.getElementById('youtubeVideo').value;
    $PI.setSettings({'apiKey': apiKey, 'period': period, 'youtubeVideo': youtubeVideo});
}

function saveYoutubeChannelIdClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const period = document.getElementById('period').value;
    const youtubeChannel = document.getElementById('youtubeChannelId').value;
    $PI.setSettings({'apiKey': apiKey, 'period': period, 'youtubeChannelId': youtubeChannel});
}

function saveYoutubeStreamClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const period = document.getElementById('period').value;
    const youtubeStream = document.getElementById('youtubeStream').value;
    $PI.setSettings({'apiKey': apiKey, 'period': period, 'youtubeStream': youtubeStream});
}

function openDocumentationClicked() {
    const url = 'https://github.com/ArtemNeFRiT/streamdeck-youtube-statistics#Configuration'
    $PI.openUrl(url)
}

function initPropertyInspector() {
    let actionUUID = $PI.actionInfo.action;
    if (actionUUID == 'com.nefrit.youtube.views' || actionUUID == 'com.nefrit.youtube.likes' || actionUUID == 'com.nefrit.youtube.comments') {
        document.getElementById("youtubeChannelInputView").style.display = "none"
        document.getElementById("youtubeChannelButtonView").style.display = "none"
        document.getElementById("youtubeStreamInputView").style.display = "none"
        document.getElementById("youtubeStreamButtonView").style.display = "none"
    }
    if (actionUUID == 'com.nefrit.youtube.subscribers' || actionUUID == 'com.nefrit.youtube.channel.views' || actionUUID == 'com.nefrit.youtube.channel.videos') {
        document.getElementById("youtubeVideoInputView").style.display = "none"
        document.getElementById("youtubeVideoButtonView").style.display = "none"
        document.getElementById("youtubeStreamInputView").style.display = "none"
        document.getElementById("youtubeStreamButtonView").style.display = "none"
    }
    if (actionUUID == 'com.nefrit.youtube.stream.online') {
        document.getElementById("youtubeVideoInputView").style.display = "none"
        document.getElementById("youtubeVideoButtonView").style.display = "none"
        document.getElementById("youtubeChannelInputView").style.display = "none"
        document.getElementById("youtubeChannelButtonView").style.display = "none"
    }
    if (actionUUID == 'com.nefrit.youtube.current.stream.online') {
        document.getElementById("youtubeVideoInputView").style.display = "none"
        document.getElementById("youtubeVideoButtonView").style.display = "none"
        document.getElementById("youtubeStreamInputView").style.display = "none"
        document.getElementById("youtubeStreamButtonView").style.display = "none"
    }
}

function sendValueToPlugin(value, param) {
    $PI.sendToPlugin({[param]: value});
}