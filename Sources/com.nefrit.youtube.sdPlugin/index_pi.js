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

function saveYoutubeVideoIdClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const youtubeVideoId = document.getElementById('youtubeVideoId').value;
    $PI.setSettings({'apiKey': apiKey, 'youtubeVideoId': youtubeVideoId});
}

function saveYoutubeChannelIdClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const youtubeChannel = document.getElementById('youtubeChannel').value;
    $PI.setSettings({'apiKey': apiKey, 'youtubeChannel': youtubeChannel});
}

function initPropertyInspector() {
    let actionUUID = $PI.actionInfo.action;
    if (actionUUID == 'com.nefrit.youtube.views' || actionUUID == 'com.nefrit.youtube.likes' || actionUUID == 'com.nefrit.youtube.comments') {
        document.getElementById("youtubeChannelInputView").style.display = "none"
        document.getElementById("youtubeChannelButtonView").style.display = "none"
    } else {
        document.getElementById("youtubeVideoInputView").style.display = "none"
        document.getElementById("youtubeVideoButtonView").style.display = "none"
    }
}

function sendValueToPlugin(value, param) {
    $PI.sendToPlugin({[param]: value});
}
