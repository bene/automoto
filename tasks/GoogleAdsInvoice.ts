import { firefox } from "playwright";

import { CronTrigger, EnvironmentManager, Task } from "../sdk"

class GoogleAdsInvoice extends Task {

    constructor() {
        super(new CronTrigger({ interval: "0 0 10 * *" }))
    }

    async onExecute() {
        const username = EnvironmentManager.getVariable("google:username")
        const password = EnvironmentManager.getSecret("google:password")

        if (!username) {
            throw "Username for Google missing"
        }

        if (!password) {
            throw "Password for Google missing"
        }

        // Create page
        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage()

        // Navigate to page
        await page.goto("https://ads.google.com/aw/billing/documents");
        await page.waitForSelector("#identifierId", { state: "visible" })
        await page.type("#identifierId", username)
        await sleep(random(1000, 3000))
        await page.click('"Next"')

        await page.screenshot({ path: `google1.png` });

        await page.waitForSelector('[aria-label="Enter your password"]', { state: "visible" })
        await page.type('[aria-label="Enter your password"]', password)
        await sleep(random(1000, 3000))
        await page.click('"Next"')

        // Test
        await page.screenshot({ path: `google2.png` });

        // Teardown
        await context.close();
        await browser.close();
    }
}

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default GoogleAdsInvoice