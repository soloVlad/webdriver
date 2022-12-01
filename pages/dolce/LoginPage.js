const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");
const HomePage = require("./HomePage");
const AccountPage = require("./AccountPage");

class LoginPage extends Page {
    static inputEmailXpath = "//div[contains(@class, 'login_account')]//input[@type='email']";
    static inputPasswordXpath = "//div[contains(@class, 'login_account')]//input[@type='password']";
    static inputRememberXpath = "//input[contains(@name, 'rememberme')]";
    static inputCheckBoxXpath = "//input[contains(@id, 'login_signup')]";
    static loginButtonXpath = "//button[contains(@class, 'login_account')]";
    static myAccountButtonXpath = "//div[contains(@class, 'header_service')]//a[contains(@class, 'login_dropdown-title')]";

    constructor(driver, user) {
        super(driver);

        this.user = user;
    }

    async login() {
        logger.info("Logging in.");
        await this.clickByXpath(LoginPage.inputEmailXpath);
        logger.info("Entering email.");
        await this.driver.findElement(By.xpath(LoginPage.inputEmailXpath)).sendKeys(this.user.getEmail());

        await this.clickByXpath(LoginPage.inputPasswordXpath);
        logger.info("Entering password.");
        await this.driver.findElement(By.xpath(LoginPage.inputPasswordXpath)).sendKeys(this.user.getPassword());

        logger.info("Clicking login button.");
        await this.clickByXpath(LoginPage.loginButtonXpath);

        return this;
    }

    async openMyAccount() {
        await this.clickByXpath(LoginPage.myAccountButtonXpath);

        return new AccountPage(this.driver);
    }

}

module.exports = LoginPage;