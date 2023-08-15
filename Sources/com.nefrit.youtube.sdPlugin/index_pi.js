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
    const youtubeVideoId = document.getElementById('youtubeVideoId').value;
    $PI.setSettings({'youtubeVideoId': youtubeVideoId});
}

function saveYoutubeChannelIdClicked() {
    const youtubeChannel = document.getElementById('youtubeChannel').value;
    $PI.setSettings({'youtubeChannel': youtubeChannel});
}

function initPropertyInspector() {
    let actionUUID = $PI.actionInfo.action;
    if (actionUUID == 'com.nefrit.youtube.views' || actionUUID == 'com.nefrit.youtube.likes' || actionUUID == 'com.nefrit.youtube.comments') {
        document.getElementById("youtubeVideoIdView").style.display = "block"
        document.getElementById("youtubeChannelView").style.display = "none"
    } else {
        document.getElementById("youtubeVideoIdView").style.display = "none"
        document.getElementById("youtubeChannelView").style.display = "block"
    }
}

function sendValueToPlugin(value, param) {
    $PI.sendToPlugin({[param]: value});
}
