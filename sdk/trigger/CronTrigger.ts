import Trigger from "./Trigger"

class CronTrigger implements Trigger {
    private readonly interval: string

    constructor(params: { interval: string }) {
        this.interval = params.interval
    }

    subscribe(fn: () => void): void {
        throw new Error("Method not implemented.")
    }
}

export default CronTrigger