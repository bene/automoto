interface IBaseContext {
    test1(): string
}

interface IAdvancedContext extends IBaseContext {
    test2(): string
}

class App {
    register(ctx: IBaseContext) {
        // Do something
    }
}

class AdvancedContext implements IAdvancedContext {
    test2(): string {
        return ""
    }

    test1(): string {
        return ""
    }
}

const app = new App()
app.register(new AdvancedContext())