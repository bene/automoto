import { RegularTask, RegularTaskContext } from "automoto";
import { chromium } from "playwright";

class HandyVertrag extends RegularTask {
    async onExecute(ctx: RegularTaskContext) {
        const username = ctx.environment.getVariable("handyvertrag:username");
        const password = ctx.environment.getSecret("handyvertrag:password");

        if (!username) {
            throw "Username for service.handyvertrag.de missing";
        }

        if (!password) {
            throw "Password for service.handyvertrag.de missing";
        }

        // Create page
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to page
        await page.goto("https://service.handyvertrag.de");

        // Enter credentials
        await page.fill("#UserLoginType_alias", username);
        await page.fill("#UserLoginType_password", password);
        await page.click("#buttonLogin > button");

        // Test
        await page.screenshot({ path: `example.png` });

        // Teardown
        await context.close();
        await browser.close();
    }
}

export default HandyVertrag;
