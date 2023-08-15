const Destination = {
    HARDWARE_AND_SOFTWARE: 0,
    HARDWARE_ONLY: 1,
    SOFTWARE_ONLY: 2,
};

class Elgato {

    constructor(url, port, pluginUUID, inRegisterEvent) {
        const youtube = new Youtube()
        this.websocket = new WebSocket(url + port);
        this.titleUpdater = new TitleUpdater(this.websocket)

        this.viewsAction = new ViewsAction(apiKey, this.titleUpdater, youtube)
        this.likesAction = new LikesAction(apiKey, this.titleUpdater, youtube)
        this.subsAction = new SubsAction(apiKey, this.titleUpdater, youtube)

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

            switch (action) {
                case ViewsAction.ACTION_UUID:
                    switch (event) {
                        case Event.KEY_DOWN:
                            self.viewsAction.onKeyDown(context, settings, coordinates, userDesiredState)
                            break;
                        case Event.KEY_UP:
                            self.viewsAction.onKeyUp(context, settings, coordinates, userDesiredState)
                            break;
                        case Event.WILL_APPEAR:
                            self.viewsAction.onWillAppear(context, settings, coordinates)
                            break;
                    }
                    break;
                case LikesAction.ACTION_UUID:
                    if (event == Event.KEY_DOWN) {
                        this.likesAction.onKeyDown(context, settings, coordinates, userDesiredState)
                    }
                    if (event == Event.KEY_UP) {
                        this.likesAction.onKeyUp(context, settings, coordinates, userDesiredState)
                    }
                    if (event == Event.WILL_APPEAR) {
                        this.likesAction.onWillAppear(context, settings, coordinates)
                    }
                    break;
                case SubsAction.ACTION_UUID:
                    if (event == Event.KEY_DOWN) {
                        this.subsAction.onKeyDown(context, settings, coordinates, userDesiredState)
                    }
                    if (event == Event.KEY_UP) {
                        this.subsAction.onKeyUp(context, settings, coordinates, userDesiredState)
                    }
                    if (event == Event.WILL_APPEAR) {
                        this.subsAction.onWillAppear(context, settings, coordinates)
                    }
                    break;
            }
        };
    }

    registerPlugin(inPluginUUID, inRegisterEvent) {
        const json = {
            "event": inRegisterEvent,
            "uuid": inPluginUUID
        };

        this.websocket.send(JSON.stringify(json));
    }
}