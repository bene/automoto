import { Context } from "./context/Context";

interface Task<T extends Context> {
    _type: string;
    onExecute: (ctx: T) => Promise<void | string>;
    onRegister?: () => void;
    onUnregister?: () => void;
}

export default Task;
