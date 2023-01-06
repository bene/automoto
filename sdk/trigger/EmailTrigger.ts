import Trigger from "./Trigger"

class EmailTrigger implements Trigger {
    private readonly address: string

    constructor(params: { address: string }) {
        this.address = params.address
    }

    subscribe(fn: () => void): void {

    }
}

export default EmailTrigger