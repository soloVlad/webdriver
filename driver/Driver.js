const webdriver = require("selenium-webdriver");
const Browser = webdriver.Browser;
const Builder = webdriver.Builder;

const argv = require("../services/ARGVReader").argv;
let capabilities = require("../resources/capabilities.json");

const bstackURL = "http://vladsolovey_nLDfEK:mF4DwzGRk2vE1B86U8rs@hub-cloud.browserstack.com/wd/hub";

class DriverSingleton {
    static driver;
    static capabilities;

    static async getInstance() {
        if (!this.driver) {
            await this.createDriver();
        }

        return this.driver;
    }

    static async createDriver() {
        switch (argv.RUNNER) {
            case "local":
                await this.createDriverLocal();
                break;
            default:
                await this.createDriverRemote();
                break;
        }
    }

    static async createDriverRemote() {
        switch(argv.BROWSER_NAME) {
            case "firefox":
                this.driver = await this.createBrowserDriverRemote(Browser.FIREFOX);
                break;
            default:
                this.driver = await this.createBrowserDriverRemote(Browser.CHROME);
                break;
        }

        await this.driver.manage().window().maximize();
    }

    static async createBrowserDriverRemote(browser) {
        this.setCapabilities(browser);
        const driver = await new Builder()
            .usingServer(bstackURL)
            .withCapabilities(this.capabilities)
            .build();

        return driver;
    }

    static async createDriverLocal() {
        switch(argv.BROWSER_NAME) {
            case "firefox":
                this.driver = await new Builder().forBrowser(Browser.FIREFOX).build();
                break;
            default:
                this.driver = await new Builder().forBrowser(Browser.CHROME).build();;
                break;
        }

        await this.driver.manage().window().maximize();
    }

    static setCapabilities(browser) {
        this.capabilities = {...capabilities};
        this.capabilities['browserName'] = browser;
    }

    static async killDriver() {
        await new Promise((resolve) => {
            setTimeout(async () => {
                resolve();
            }, 1500);
        })
        await this.driver.quit();
    }
}

module.exports = DriverSingleton;