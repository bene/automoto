import { ScheduledTask, ScheduledTaskContext } from "automoto";

class SimpleScheduledTask extends ScheduledTask {
    constructor() {
        super({ interval: "* * * * * *" });
    }

    async onExecute(context: ScheduledTaskContext): Promise<string | void> {
        console.log("Hallo Welt!");
    }
}

export default SimpleScheduledTask;
