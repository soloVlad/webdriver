const Page = require("./page");

class SearchResultsPage extends Page {
    constructor(driver, searchValue) {
        super(driver);
        this.searchValue = searchValue;
        this.searchedElementsXpath = `//*[@class='hm-product-item']//a[text()='${this.searchValue}']`;
    }

    async checkSearchResults() {
        await this.findAllByXpath(this.searchedElementsXpath);

        return this;
    }

}

module.exports = SearchResultsPage;
