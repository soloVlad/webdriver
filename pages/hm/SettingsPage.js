const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");

class SettingsPage extends Page {
    static userEmailXpath = "//p[contains(text(), '@')]";

    constructor(driver, user) {
        super(driver);

        this.user = user;
    }

    async getUserEmail() {
        logger.info("Getting user email.");
        const result = await this.findByXpath(SettingsPage.userEmailXpath);
        logger.info(await result.getText());
        return result.getText();
    }

}

module.exports = SettingsPage;