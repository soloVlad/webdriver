const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");
const SearchResultsPage = require("./SearchResultsPage");

class HomePage extends Page {
    static searchInputFieldXpath = "//div[contains(@class, 'SearchBar-module--visibleDesktop')][not(ancestor::ul)]//input[@placeholder='Search products']";
    static resourcesFileName = "homePage.properties";

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

    async clickSearchInputField() {
        logger.info("Clicking search field.");
        await this.clickByXpath(HomePage.searchInputFieldXpath);

        return this;
    }

    async searchProduct(productName) {
        logger.info(`Searching for ${productName}.`);
        await this.driver.findElement(By.xpath(HomePage.searchInputFieldXpath)).sendKeys(productName, Key.ENTER);

        return this;
    }

}

module.exports = HomePage;