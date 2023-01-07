import { ScheduledTask, ScheduledTaskContext } from "../packages/sdk/ScheduledTask";

class SimpleScheduledTask extends ScheduledTask {

    constructor() {
        super({ interval: "* * * * * *" })
    }

    async onExecute(context: ScheduledTaskContext): Promise<string | void> {
        console.log("Hallo Welt!")
    }
}

export default SimpleScheduledTask