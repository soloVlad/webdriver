const webdriver = require("selenium-webdriver");
const capabilities = require("../capabilities.json");

const HomePage = require("../pages/homePage");

describe("Search product test", () => {
    const siteURL = "https://www2.hm.com/en_gb/index.html";
    const bstackURL = "http://vladsolovey_nLDfEK:mF4DwzGRk2vE1B86U8rs@hub-cloud.browserstack.com/wd/hub";

    beforeEach(async function () {
        this.driver = await new webdriver.Builder()
            .usingServer(bstackURL)
            .withCapabilities({
                ...capabilities,
                ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
            })
            .build();
        await this.driver.manage().window().maximize();
    });

    it("Should contain products", async function() {
        const searchedProduct = "Regular Fit Ripstop cargo trousers";

        const homePage = new HomePage(this.driver);
        await homePage.openPage(siteURL);
        await homePage.acceptCookies();

        await homePage.clickSearchInputField();
        const searchResultsPage = await homePage.searchProduct(searchedProduct);
        await searchResultsPage.checkSearchResults();
    }).timeout(60000);

    afterEach(async function () {
        await this.driver.quit();
    });

});
