/// <reference path="../libs/js/property-inspector.js" />
/// <reference path="../libs/js/action.js" />
/// <reference path="../libs/js/utils.js" />

console.log('Property Inspector loaded', $PI);

// register a callback for the 'connected' event
// this is all you need to communicate with the plugin and the StreamDeck software
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
    const youtubeVideoId = document.getElementById('youtubeVideoIdInput').value;
    $PI.setSettings({'youtubeVideoId': youtubeVideoId});
}

function saveYoutubeChannelIdClicked() {
    const youtubeChannel = document.getElementById('youtubeChannelInput').value;
    $PI.setSettings({'youtubeChannel': youtubeChannel});
}

function adjustTabPadding(paddingInPixels = '12px') {
    document.body.style.setProperty('--sdpi-tab-padding-horizontal', paddingInPixels);
}

adjustTabPadding('8px');

function initPropertyInspector(action) {
    let actionUUID = $PI.actionInfo.action;
    if (actionUUID == 'com.nefrit.youtube.views' || actionUUID == 'com.nefrit.youtube.likes') {
        document.getElementById("youtubeVideoIdView").style.display = "block"
        document.getElementById("youtubeChannelView").style.display = "none"
    } else {
        document.getElementById("youtubeVideoIdView").style.display = "none"
        document.getElementById("youtubeChannelView").style.display = "block"
    }
}

// our method to pass values to the plugin
function sendValueToPlugin(value, param) {
    $PI.sendToPlugin({[param]: value});
}
