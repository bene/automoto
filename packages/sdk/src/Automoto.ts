import { createGraphQLError, createYoga } from "graphql-yoga";
import { makeSchema, mutationType, nonNull, objectType, queryType, stringArg } from "nexus";
import { createServer } from 'http'

import Environment from "./environment";
import { RegularTask } from "./RegularTask";
import { ScheduledTask } from "./ScheduledTask";

interface TaskRegistrations {
    [taskName: string]: RegularTask | ScheduledTask
}

class Automoto {

    private readonly tasks: TaskRegistrations = {}

    constructor(id: string) {

    }

    register(taskName: string, task: RegularTask | ScheduledTask) {
        if (this.tasks[taskName]) {
            throw new Error("Task with identical name already registered")
        }
        this.tasks[taskName] = task
    }

    listen(bind: string | number) {

        const taskRegistrations = this.tasks

        const Query = queryType({
            definition(t) {
                t.string('hello', {
                    args: { name: stringArg() },
                    resolve: (parent, { name }) => `Hello ${name || 'World'}!`,
                })
            },
        })

        const Mutation = mutationType({
            definition(t) {
                t.field("execute", {
                    args: {
                        taskName: nonNull(stringArg())
                    },
                    type: objectType({
                        name: "ExecutionResult",
                        definition(t) {
                            t.string("resultId", {
                            })
                        },
                    }),
                    resolve: async (_, { taskName }) => {
                        if (!taskRegistrations[taskName]) {
                            throw createGraphQLError("No task with given name registered")
                        }

                        console.log("Executing task:", taskName)
                        taskRegistrations[taskName].onExecute({
                            environment: new Environment(),
                            output: {
                                async table() {

                                },
                                async download() {

                                },
                                async markdown() {

                                },
                                async text() {

                                }
                            },
                            input: {
                                async text() {
                                    return ""
                                },
                            }
                        })
                    }
                })
            },
        })

        const schema = makeSchema({
            types: [Query, Mutation]
        })

        const yoga = createYoga({
            schema,
        })

        const server = createServer(yoga)

        server.listen(bind, () => `Server is running on http://localhost:4000`)
    }
}

export default Automoto