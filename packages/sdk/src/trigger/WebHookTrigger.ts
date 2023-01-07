import Trigger from "./Trigger";

class WebHookTrigger implements Trigger {
    subscribe(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
}

export default WebHookTrigger