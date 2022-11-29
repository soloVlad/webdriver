const webdriver = require("selenium-webdriver");
const Browser = webdriver.Browser;
const Builder = webdriver.Builder;

const argv = require("../services/ARGVReader").argv;
const capabilities = require("../resources/capabilities.json");

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
        return new Builder()
            .usingServer(this.capabilities["bstackURL"])
            .withCapabilities(this.capabilities)
            .build();
    }

    static async createDriverLocal() {
        switch(argv.BROWSER_NAME) {
            case "firefox":
                this.driver = await new Builder().forBrowser(Browser.FIREFOX).build();
                break;
            default:
                this.driver = await new Builder().forBrowser(Browser.CHROME).build();
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

// (async function() {
//     let driver = await DriverSingleton.getInstance();
//     await DriverSingleton.killDriver();
// })();

module.exports = DriverSingleton;