import { CronJob } from "cron"
import { Context } from "./context/Context"
import Output from "./context/Output"
import Environment from "./environment"
import Task from "./Task"

interface ScheduledTaskContext extends Context {
    output: Output
}

abstract class ScheduledTask implements Task<ScheduledTaskContext> {

    private readonly job: CronJob
    readonly _type = "ScheduledTask"

    constructor({ interval }: { interval: string }) {
        this.job = new CronJob(interval, () => {
            this.onExecute({
                environment: new Environment(),
                output: {
                    async table() {

                    },
                    async download() {

                    },
                    async markdown() {

                    },
                    async text() {

                    },
                }
            })
        })
    }

    onRegister() {
        this.job.start()
    }

    onUnregister() {
        this.job.stop()
    }

    abstract onExecute(context: ScheduledTaskContext): Promise<void | string>
}

export { ScheduledTask, type ScheduledTaskContext }