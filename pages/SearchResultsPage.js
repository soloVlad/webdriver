const Page = require("./Page");

class SearchResultsPage extends Page {
    static searchItemXpath = `//*[@class='hm-product-item']//*[@class='item-heading']`;

    constructor(driver, searchResult) {
        super(driver);

        this.searchResult = searchResult;
    }

    async openPage() {
        return super.openPage(this.searchResult.searchPageUrl);
    }

    async getSearchItemsHeadings() {
        return this.getAllElementsText("Getting search results", SearchResultsPage.searchItemXpath);
    }
}

module.exports = SearchResultsPage;