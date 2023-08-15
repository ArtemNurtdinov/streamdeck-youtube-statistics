class TitleUpdater {

    constructor(websocket) {
        self.websocket = websocket
    }

    updateTitle(context, title) {
        const json = {
            "event": "setTitle",
            "context": context,
            "payload": {
                "title": "" + title,
                "target": Destination.HARDWARE_AND_SOFTWARE
            }
        };

        self.websocket.send(JSON.stringify(json));
    }
}