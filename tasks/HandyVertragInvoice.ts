import { chromium } from "playwright";

import { EmailTrigger, EnvironmentManager, Task } from "../sdk";

class HandyVertrag extends Task {

    constructor() {
        super(new EmailTrigger({ address: "handyvertrag+evobend@automoto.io" }))
    }

    async onExecute() {
        const username = EnvironmentManager.getVariable("handyvertrag:username")
        const password = EnvironmentManager.getSecret("handyvertrag:password")

        if (!username) {
            throw "Username for service.handyvertrag.de missing"
        }

        if (!password) {
            throw "Password for service.handyvertrag.de missing"
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

export default HandyVertrag