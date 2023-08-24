const Destination = {
    HARDWARE_AND_SOFTWARE: 0,
    HARDWARE_ONLY: 1,
    SOFTWARE_ONLY: 2,
};

class Elgato {

    constructor(url, port, pluginUUID, inRegisterEvent) {
        this.websocket = new WebSocket(url + port)
        const youtube = new Youtube()

        const titleUpdater = new TitleUpdater(this.websocket)
        const urlOpener = new URLOpener(this.websocket)

        this.viewsAction = new ViewsAction(titleUpdater, urlOpener, youtube)
        this.likesAction = new LikesAction(titleUpdater, urlOpener, youtube)
        this.commentsAction = new CommentsAction(titleUpdater, urlOpener, youtube)

        this.subsAction = new SubsAction(titleUpdater, urlOpener, youtube)
        this.channelViewsAction = new ChannelViewsAction(titleUpdater, urlOpener, youtube)
        this.channelVideosAction = new ChannelVideosAction(titleUpdater, urlOpener, youtube)

        this.currentStreamAction = new CurrentStreamAction(titleUpdater, urlOpener, youtube)

        this.websocket.onopen = () => {
            this.registerPlugin(pluginUUID, inRegisterEvent);
        };

        this.websocket.onclose = () => {
        };

        this.websocket.onmessage = (evt) => {
            const jsonObj = JSON.parse(evt.data);
            const event = jsonObj['event'];
            const actionJson = jsonObj['action'];
            const context = jsonObj['context'];

            const jsonPayload = jsonObj && jsonObj['payload'];
            const settings = jsonPayload && jsonPayload['settings'];
            const coordinates = jsonPayload && jsonPayload['coordinates'];
            const userDesiredState = jsonPayload && jsonPayload['userDesiredState'];

            let action

            switch (actionJson) {
                case ViewsAction.ACTION_UUID:
                    action = this.viewsAction
                    break;
                case LikesAction.ACTION_UUID:
                    action = this.likesAction
                    break;
                case CommentsAction.ACTION_UUID:
                    action = this.commentsAction
                    break;
                case SubsAction.ACTION_UUID:
                    action = this.subsAction
                    break
                case ChannelViewsAction.ACTION_UUID:
                    action = this.channelViewsAction
                    break
                case ChannelVideosAction.ACTION_UUID:
                    action = this.channelVideosAction
                    break
                case CurrentStreamAction.ACTION_UUID:
                    action = this.currentStreamAction
                    break
            }

            switch (event) {
                case BaseAction.ACTION_EVENT_KEY_DOWN:
                    action.onKeyDown(context, settings, coordinates, userDesiredState);
                    break;
                case BaseAction.ACTION_EVENT_KEY_UP:
                    action.onKeyUp(context, settings, coordinates, userDesiredState);
                    break;
                case BaseAction.ACTION_EVENT_WILL_APPEAR:
                    action.onWillAppear(context, settings, coordinates);
                    break;
                case BaseAction.ACTION_EVENT_WILL_DISAPPEAR:
                    action.onWillDisappear(context, settings, coordinates);
                    break;
                case BaseAction.ACTION_EVENT_DID_RECEIVE_SETTINGS:
                    action.didReceiveSettings(context, settings, coordinates);
                    break;
            }

        }
    }

    registerPlugin(inPluginUUID, inRegisterEvent) {
        const json = {
            "event": inRegisterEvent,
            "uuid": inPluginUUID
        };

        this.websocket.send(JSON.stringify(json));
    }
}