import Trigger from "./trigger/Trigger"

abstract class Task {
    private readonly trigger: Trigger

    constructor(trigger: Trigger) {
        this.trigger = trigger
    }

    abstract onExecute(): Promise<void | string>
}

export default Task