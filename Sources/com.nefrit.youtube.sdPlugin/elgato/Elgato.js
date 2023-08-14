class Elgato {

    constructor(url, port, pluginUUID, inRegisterEvent) {
        this.viewsAction = new ViewsAction(apiKey, this)
        this.likesAction = new LikesAction(apiKey, this)
        this.subsAction = new SubsAction(apiKey, this)
        this.websocket = new WebSocket(url + port);
        this.destination = Object.freeze({"HARDWARE_AND_SOFTWARE": 0, "HARDWARE_ONLY": 1, "SOFTWARE_ONLY": 2})

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

            if (action == ViewsAction.ACTION_UUID) {
                if (event == "keyDown") {
                    this.viewsAction.onKeyDown(context, settings, coordinates, userDesiredState)
                }
                if (event == "keyUp") {
                    this.viewsAction.onKeyUp(context, settings, coordinates, userDesiredState)
                }
                if (event == "willAppear") {
                    this.viewsAction.onWillAppear(context, settings, coordinates)
                }
            }

            if (action == LikesAction.ACTION_UUID) {
                if (event == "keyDown") {
                    this.likesAction.onKeyDown(context, settings, coordinates, userDesiredState)
                }
                if (event == "keyUp") {
                    this.likesAction.onKeyUp(context, settings, coordinates, userDesiredState)
                }
                if (event == "willAppear") {
                    this.likesAction.onWillAppear(context, settings, coordinates)
                }
            }

            if (action == SubsAction.ACTION_UUID) {
                if (event == "keyDown") {
                    this.subsAction.onKeyDown(context, settings, coordinates, userDesiredState)
                }
                if (event == "keyUp") {
                    this.subsAction.onKeyUp(context, settings, coordinates, userDesiredState)
                }
                if (event == "willAppear") {
                    this.subsAction.onWillAppear(context, settings, coordinates)
                }
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

    updateTitle(context, title) {
        const json = {
            "event": "setTitle",
            "context": context,
            "payload": {
                "title": "" + title,
                "target": this.destination.HARDWARE_AND_SOFTWARE
            }
        };

        this.websocket.send(JSON.stringify(json));
    }
}