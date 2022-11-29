const Page = require("./Page");
const logger = require("../logger");

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
        logger.info("Getting search results");
        const results = await this.findAllByXpath(SearchResultsPage.searchItemXpath);
        const unpackedResults = [];

        for (const result of results) {
            let text = await result.getText();
            unpackedResults.push(text);
        }

        return unpackedResults;
    }
}

module.exports = SearchResultsPage;