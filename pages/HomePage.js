const Page = require("./Page");
const { By, Key } = require("selenium-webdriver");

const searchInputFieldXpath = "//div[contains(@class, 'SearchBar-module--visibleDesktop')][not(ancestor::ul)]//input[@placeholder='Search products']";

const SearchResultsPage = require("./SearchResultsPage");

class HomePage extends Page {
    async clickSearchInputField() {
        await this.clickByXpath(searchInputFieldXpath);

        return this;
    }

    async searchProduct(productName) {
        await this.driver.findElement(By.xpath(searchInputFieldXpath)).sendKeys(productName, Key.ENTER);

        return new SearchResultsPage(this.driver, productName);
    }

}

module.exports = HomePage;