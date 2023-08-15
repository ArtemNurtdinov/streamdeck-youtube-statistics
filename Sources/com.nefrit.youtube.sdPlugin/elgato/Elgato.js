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

        this.viewsAction = new ViewsAction(titleUpdater, youtube)
        this.likesAction = new LikesAction(titleUpdater, youtube)
        this.commentsAction = new CommentsAction(titleUpdater, youtube)

        this.subsAction = new SubsAction(titleUpdater, youtube)
        this.channelViewsAction = new ChannelViewsAction(titleUpdater, youtube)
        this.channedVideosAction = new ChannelVideosAction(titleUpdater, youtube)

        this.websocket.onopen = () => {
            this.registerPlugin(pluginUUID, inRegisterEvent);
        };

        this.websocket.onclose = () => {
        };

        this.websocket.onmessage = (evt) => {
            const jsonObj = JSON.parse(evt.data);
            const event = jsonObj['event'];
            const action = jsonObj['action'];
            const context = jsonObj['context'];

            const jsonPayload = jsonObj && jsonObj['payload'];
            const settings = jsonPayload && jsonPayload['settings'];
            const coordinates = jsonPayload && jsonPayload['coordinates'];
            const userDesiredState = jsonPayload && jsonPayload['userDesiredState'];

            console.log('new event', event, 'action', action)

            switch (action) {
                case ViewsAction.ACTION_UUID:
                    switch (event) {
                        case "keyDown":
                            this.viewsAction.onKeyDown(context, settings, coordinates, userDesiredState);
                            break;
                        case "keyUp":
                            this.viewsAction.onKeyUp(context, settings, coordinates, userDesiredState);
                            break;
                        case "willAppear":
                            this.viewsAction.onWillAppear(context, settings, coordinates);
                            break;
                    }
                    break;
                case LikesAction.ACTION_UUID:
                    switch (event) {
                        case "keyDown":
                            this.likesAction.onKeyDown(context, settings, coordinates, userDesiredState);
                            break;
                        case "keyUp":
                            this.likesAction.onKeyUp(context, settings, coordinates, userDesiredState);
                            break;
                        case "willAppear":
                            this.likesAction.onWillAppear(context, settings, coordinates);
                            break;
                    }
                    break;
                case CommentsAction.ACTION_UUID:
                    switch (event) {
                        case "keyDown":
                            this.commentsAction.onKeyDown(context, settings, coordinates, userDesiredState);
                            break;
                        case "keyUp":
                            this.commentsAction.onKeyUp(context, settings, coordinates, userDesiredState);
                            break;
                        case "willAppear":
                            this.commentsAction.onWillAppear(context, settings, coordinates);
                            break;
                    }
                    break;
                case SubsAction.ACTION_UUID:
                    switch (event) {
                        case "keyDown":
                            this.subsAction.onKeyDown(context, settings, coordinates, userDesiredState);
                            break;
                        case "keyUp":
                            this.subsAction.onKeyUp(context, settings, coordinates, userDesiredState);
                            break;
                        case "willAppear":
                            this.subsAction.onWillAppear(context, settings, coordinates);
                            break;
                    }
                    break;
                case ChannelViewsAction.ACTION_UUID:
                    switch (event) {
                        case "keyDown":
                            this.channelViewsAction.onKeyDown(context, settings, coordinates, userDesiredState);
                            break;
                        case "keyUp":
                            this.channelViewsAction.onKeyUp(context, settings, coordinates, userDesiredState);
                            break;
                        case "willAppear":
                            this.channelViewsAction.onWillAppear(context, settings, coordinates);
                            break;
                    }
                    break;
                case ChannelVideosAction.ACTION_UUID:
                    switch (event) {
                        case "keyDown":
                            this.channedVideosAction.onKeyDown(context, settings, coordinates, userDesiredState);
                            break;
                        case "keyUp":
                            this.channedVideosAction.onKeyUp(context, settings, coordinates, userDesiredState);
                            break;
                        case "willAppear":
                            this.channedVideosAction.onWillAppear(context, settings, coordinates);
                            break;
                    }
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