const Page = require("./page");
const { Key } = require("selenium-webdriver");

const searchInputFieldXpath = "//div[contains(@class, 'SearchBar-module--visibleDesktop')][not(ancestor::ul)]//input[@placeholder='Search products']";
const cookiesPopupPath = "//*[@id='onetrust-accept-btn-handler']";

const SearchResultsPage = require("./searchResultsPage");

class HomePage extends Page {
    async clickSearchInputField() {
        await this.clickByXpath(searchInputFieldXpath);

        return this;
    }

    async searchProduct(productName) {
        await this.findByXpath(searchInputFieldXpath).sendKeys(productName, Key.ENTER);

        return new SearchResultsPage(this.driver, productName);
    }

    async acceptCookies() {
        await this.clickByXpath(cookiesPopupPath);

        return this;
    }
}

module.exports = HomePage;