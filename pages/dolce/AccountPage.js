const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");

class AccountPage extends Page {
    static userEmailXpath = "//*[@data-customer-attribute='email']";

    constructor(driver) {
        super(driver);
    }

    async getUserEmail() {
        logger.info("Getting user email.");
        const result = await this.findByXpath(AccountPage.userEmailXpath);
        logger.info(await result.getText());
        return result.getText();
    }
}

module.exports = AccountPage;