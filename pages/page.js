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
}

module.exports = Page;