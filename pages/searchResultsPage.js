const Page = require("./page");

class SearchResultsPage extends Page {
    constructor(driver, searchValue) {
        super(driver);
        this.searchValue = searchValue;
        this.searchedElementsXpath = `//*[@class='hm-product-item']//a[text()='${searchValue}']`;
    }

    async getSearchedResults() {
        return this.findAllByXpath(this.searchedElementsXpath);
    }

}

module.exports = SearchResultsPage;
