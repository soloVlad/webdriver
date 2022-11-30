const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");
const SettingsPage = require("./SettingsPage");

class AccountPage extends Page {
    static settingButtonXpath = "//a[contains(@href, 'settings')][contains(@class, 'UserMenu')]";

    constructor(driver, user) {
        super(driver);

        this.user = user;
    }

    async openSettingsPage() {
        await this.clickByXpath(AccountPage.settingButtonXpath);

        return new SettingsPage(this.driver, this.user);
    }

}

module.exports = AccountPage;