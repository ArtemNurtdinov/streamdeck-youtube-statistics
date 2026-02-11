$PI.onConnected(jsn => {
    console.log('Property Inspector connected', jsn);
    registerHandlers();
    initPropertyInspector();
    const settings = jsn?.actionInfo?.payload?.settings ?? {};
    console.log(settings);
    Object.entries(settings).forEach(([key, value]) => {
        console.log('setting', key, value);
        const el = document.getElementById(key);
        if (el) {
            el.value = value;
        }
    });
});

function registerHandlers() {
    const saveVideoButton = document.getElementById('saveVideoButton');
    const saveChannelButton = document.getElementById('saveChannelButton');
    const saveStreamButton = document.getElementById('saveStreamButton');
    const documentationLink = document.getElementById('documentationLink');

    attachClickHandler(saveVideoButton, saveYoutubeVideoClicked);
    attachClickHandler(saveChannelButton, saveYoutubeChannelIdClicked);
    attachClickHandler(saveStreamButton, saveYoutubeStreamClicked);
    attachClickHandler(documentationLink, openDocumentationClicked);
}

function attachClickHandler(element, handler) {
    if (!element || element.dataset.bound === '1') {
        return;
    }
    element.addEventListener('click', handler);
    element.dataset.bound = '1';
}

function saveYoutubeVideoClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const period = document.getElementById('period').value;
    const youtubeVideo = document.getElementById('youtubeVideo').value;
    $PI.setSettings({'apiKey': apiKey, 'period': period, 'youtubeVideo': youtubeVideo});
    $PI.getSettings();
    markSaved('saveVideoButton');
}

function saveYoutubeChannelIdClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const period = document.getElementById('period').value;
    const youtubeChannel = document.getElementById('youtubeChannelId').value;
    $PI.setSettings({'apiKey': apiKey, 'period': period, 'youtubeChannelId': youtubeChannel});
    $PI.getSettings();
    markSaved('saveChannelButton');
}

function saveYoutubeStreamClicked() {
    const apiKey = document.getElementById('apiKey').value;
    const period = document.getElementById('period').value;
    const youtubeStream = document.getElementById('youtubeStream').value;
    $PI.setSettings({'apiKey': apiKey, 'period': period, 'youtubeStream': youtubeStream});
    $PI.getSettings();
    markSaved('saveStreamButton');
}

function markSaved(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) {
        return;
    }
    const initialText = button.innerText;
    button.innerText = 'Saved';
    setTimeout(() => {
        button.innerText = initialText;
    }, 1200);
}

function openDocumentationClicked() {
    const url = 'https://github.com/ArtemNeFRiT/streamdeck-youtube-statistics#Configuration'
    $PI.openUrl(url)
}

function initPropertyInspector() {
    const actionUUID = $PI?.actionInfo?.action;
    if (!actionUUID) {
        return;
    }

    const isLatestVideoAction = hasActionSuffix(actionUUID, 'video.latest.views')
        || hasActionSuffix(actionUUID, 'video.latest.likes')
        || hasActionSuffix(actionUUID, 'video.latest.comments');
    const isVideoAction = ((hasActionSuffix(actionUUID, 'views') || hasActionSuffix(actionUUID, 'likes') || hasActionSuffix(actionUUID, 'comments')) && !isLatestVideoAction);
    const isChannelAction = hasActionSuffix(actionUUID, 'subscribers') || hasActionSuffix(actionUUID, 'channel.views') || hasActionSuffix(actionUUID, 'channel.videos') || isLatestVideoAction;
    const isStreamAction = hasActionSuffix(actionUUID, 'stream.online');

    if (isVideoAction) {
        document.getElementById("youtubeChannelInputView").style.display = "none"
        document.getElementById("youtubeChannelButtonView").style.display = "none"
        document.getElementById("youtubeStreamInputView").style.display = "none"
        document.getElementById("youtubeStreamButtonView").style.display = "none"
    }
    if (isChannelAction) {
        document.getElementById("youtubeVideoInputView").style.display = "none"
        document.getElementById("youtubeVideoButtonView").style.display = "none"
        document.getElementById("youtubeStreamInputView").style.display = "none"
        document.getElementById("youtubeStreamButtonView").style.display = "none"
    }
    if (isStreamAction) {
        document.getElementById("youtubeVideoInputView").style.display = "none"
        document.getElementById("youtubeVideoButtonView").style.display = "none"
        document.getElementById("youtubeStreamInputView").style.display = "none"
        document.getElementById("youtubeStreamButtonView").style.display = "none"
    }
}

function hasActionSuffix(actionUUID, suffix) {
    return actionUUID === suffix || actionUUID.endsWith(`.${suffix}`);
}

function sendValueToPlugin(value, param) {
    $PI.sendToPlugin({[param]: value});
}