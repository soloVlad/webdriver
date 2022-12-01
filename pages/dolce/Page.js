const { By, until } = require("selenium-webdriver");
const logger = require("../../logger");
const DataReader = require("../../services/DataReader");

const { LOADING_TIME } = require("../../config/constants");

class Page {
    static cookiesPopupPath = "//button[@data-var='acceptBtn1']";

    constructor(driver) {
        this.driver = driver;
    }

    async openPage(url) {
        logger.info(`Opening ${url} page.`);
        await this.driver.get(url);

        return this;
    }

    async getPageUrl() {
        return this.driver.getCurrentUrl();
    }

    async findByXpath(xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath)), LOADING_TIME * 3);
    }

    async findAllByXpath(xpath) {
        return this.driver.wait(until.elementsLocated(By.xpath(xpath)), LOADING_TIME * 3);
    }

    async getAllElementsText(loggerMsg, xpath) {
        logger.info(loggerMsg);
        const results = await this.findAllByXpath(xpath);
        let unpackedResults = [];

        for (const result of results) {
            let text = await result.getText();
            unpackedResults.push(text);
        }

        return unpackedResults;
    }

    async clickByXpath(xpath) {
        const element = await this.findByXpath(xpath);
        await element.click();

        return this;
    }

    async acceptCookies() {
        logger.info("Accepting cookies.");
        await this.clickByXpath(Page.cookiesPopupPath);

        return this;
    }

    async loadProperties(fileName) {
        const props = await DataReader.getTestData(fileName, "dolce");

        for (const key in props) {
            this[key] = props[key];
        }

        return this;
    }
}

module.exports = Page;