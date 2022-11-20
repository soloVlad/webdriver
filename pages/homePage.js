const Page = require("./page");
const { By, Key } = require("selenium-webdriver");

const searchInputFieldXpath = "//div[contains(@class, 'SearchBar-module--visibleDesktop')][not(ancestor::ul)]//input[@placeholder='Search products']";

class HomePage extends Page {
    async clickSearchInputField() {
        await this.clickByXpath(searchInputFieldXpath);

        return this;
    }

    async searchProduct(productName) {
        await this.findByXpath(searchInputFieldXpath).sendKeys(productName, Key.ENTER);

        // TODO: change to searchResultsPage
        return this;
    }
}

module.exports = HomePage;