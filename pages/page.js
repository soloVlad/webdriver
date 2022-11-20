const { By, until } = require("selenium-webdriver");

class Page {
    constructor(driver) {
        this.driver = driver;
    }

    async openPage(url) {
        await this.driver.get(url);

        return this;
    }

    async findByXpath(xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
    }

    async findAllByXpath(xpath) {
        return this.driver.wait(until.elementsLocated(By.xpath(xpath)), 5000);
    }

    async clickByXpath(xpath) {
        const element = await this.findByXpath(xpath);
        await element.click();

        return this;
    }
}

module.exports = Page;