const webdriver = require("selenium-webdriver");
const capabilities = require("../capabilities.json");

const ItemPage = require("../pages/ItemPage");
const FavouritesPage = require("../pages/FavouritesPage");

describe("Add to favourites", () => {
    const siteURL = "https://www2.hm.com/en_gb/productpage.1089412001.html";
    const favouritesURL = "https://www2.hm.com/en_gb/favourites";
    const bstackURL = "http://vladsolovey_nLDfEK:mF4DwzGRk2vE1B86U8rs@hub-cloud.browserstack.com/wd/hub";

    beforeEach(async function () {
        this.driver = new webdriver.Builder()
            .usingServer(bstackURL)
            .withCapabilities({
                ...capabilities,
                ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
            })
            .build();
        await this.driver.manage().window().maximize();
    });

    it("Should add to favourites", async function() {
        const itemName = "Regular Fit Ripstop cargo trousers";

        const itemPage = new ItemPage(this.driver);
        await itemPage.openPage(siteURL);
        await itemPage.acceptCookies();

        await itemPage.clickLikeButton();

        const favouritesPage = new FavouritesPage(this.driver);
        await favouritesPage.openPage(favouritesURL);
        await favouritesPage.checkItemExist(itemName);
    }).timeout(60000);

    afterEach(async function () {
        await this.driver.quit();
    });

});
