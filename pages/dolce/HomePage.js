const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");
const LoginPage = require("./LoginPage");
const AccountPage = require("./AccountPage");

class HomePage extends Page {
    static resourcesFileName = "homePage.properties";
    static loginButtonXpath = "//button[contains(@class, 'login_dropdown')]";
    static myAccountButtonXpath = "//div[contains(@class, 'header_service')]//a[contains(@class, 'login_dropdown-title')]";

    constructor(driver) {
        super(driver);

        this.homePageUrl = null;
    }

    async loadProperties() {
        return super.loadProperties(HomePage.resourcesFileName);
    }

    async openPage() {
        return super.openPage(this.homePageUrl);
    }

    async openLoginPage(user) {
        await this.clickByXpath(HomePage.loginButtonXpath);

        return new LoginPage(this.driver, user);
    }

    async openMyAccount() {
        await this.clickByXpath(HomePage.myAccountButtonXpath);

        return new AccountPage(this.driver);
    }
}

module.exports = HomePage;