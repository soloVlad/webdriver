const Page = require("./Page");

class FavouritePage extends Page {
    static resourcesFileName = "favouritesPage.properties";
    static favouritesItemHeadingXpath = "//h2[contains(@class, 'ProductTitle')]";

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