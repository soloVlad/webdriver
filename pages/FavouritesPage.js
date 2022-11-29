const Page = require("./Page");
const logger = require("../logger");

class FavouritePage extends Page {
    static resourcesFileName = "favouritesPage.properties";
    //static favouritesItemHeadingXpath = "//h2[contains(@class, 'productTitle')]";
    static favouritesItemHeadingXpath ="/html/body/div[2]/main/div[2]/ul[1]/li/article/div[2]/div/h2";

    constructor(driver) {
        super(driver);

        this.favouritesPageUrl = null;
    }

    async loadProperties() {
        return super.loadProperties(FavouritePage.resourcesFileName);
    }

    async openPage() {
        return super.openPage(this.favouritesPageUrl);
    }

    async getFavouritesItemsHeadings() {
        return this.getAllElementsText("Getting favourites items", FavouritePage.favouritesItemHeadingXpath);
    }
}

module.exports = FavouritePage;