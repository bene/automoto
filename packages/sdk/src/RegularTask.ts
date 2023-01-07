import { Context } from "./context/Context"
import Input from "./context/Input"
import Output from "./context/Output"
import Task from "./Task"

interface RegularTaskContext extends Context {
    input: Input
    output: Output
}

abstract class RegularTask implements Task<RegularTaskContext> {

    abstract onExecute(context: RegularTaskContext): Promise<void | string>

    readonly _type = "RegularTask"
}

export { RegularTask, type RegularTaskContext }