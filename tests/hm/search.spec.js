const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../../services/DataReader");
const Driver = require("../../driver/Driver");

const HomePage = require("../../pages/hm/HomePage");
const SearchResultsPage = require("../../pages/hm/SearchResultsPage");
const SearchResult = require("../../models/SearchResult");
const { TEST_TIMEOUT } = require("../../config/constants");

describe("Search product test", () => {
    before(async function () {
        const props = await DataReader.getTestData("search.properties");
        for (const key in props) {
            this[key] = props[key];
        }
    });

    beforeEach(async function() {
        this.driver = await Driver.getInstance();
    })

    afterEach(async function() {
        if (this.currentTest.state !== "passed") {
            const image = await this.driver.takeScreenshot();
            await require('fs').writeFile('./screenshots/searchFail.png', image, 'base64', (err) => console.log(err));
        }
        await Driver.killDriver();
    })

    it("Should handle search", async function() {
        const commonSearchValue = this.commonSearchValue;
        const homePage = new HomePage(this.driver);
        await homePage.loadProperties();
        await homePage.openPage();
        await homePage.acceptCookies();
        await homePage.clickSearchInputField();
        await homePage.searchProduct(this.commonSearchValue);

        const searchResultsPage = new SearchResultsPage(
            this.driver,
            new SearchResult(this.commonSearchValue, this.commonSearchResultsUrl)
        );
        await searchResultsPage.openPage();
        const searchItemsHeadings = await searchResultsPage.getSearchItemsHeadings();

        expect(searchItemsHeadings).to.not.be.empty;
        searchItemsHeadings.should.all.satisfy(heading => heading === commonSearchValue);
    }).timeout(TEST_TIMEOUT);
});
