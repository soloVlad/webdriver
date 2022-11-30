const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");
const AccountPage = require("./AccountPage");

class LoginPage extends Page {
    static loginButtonXpath = "//div[contains(@class, 'SignIn')]//button";
    static emailFieldXpath = "//input[@id='email']";
    static passwordFieldXpath = "//input[@id='password']";
    static resourcesFileName = "loginPage.properties";

    constructor(driver, user) {
        super(driver);

        this.user = user;
        this.loginPageUrl = null;
    }

    async loadProperties() {
        return super.loadProperties(LoginPage.resourcesFileName);
    }

    async openPage() {
        await super.openPage(this.loginPageUrl);
        await this.clickByXpath(LoginPage.loginButtonXpath);

        return this;
    }

    async login() {
        logger.info("Entering user data.");
        await this.clickByXpath(LoginPage.emailFieldXpath);
        await this.driver.findElement(By.xpath(LoginPage.emailFieldXpath)).sendKeys(this.user.getEmail());
        await this.clickByXpath(LoginPage.passwordFieldXpath);
        await this.driver.findElement(By.xpath(LoginPage.passwordFieldXpath)).sendKeys(this.user.getPassword(), Key.ENTER);

        return new AccountPage(this.driver, this.user);
    }

}

module.exports = LoginPage;