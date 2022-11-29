const Page = require("./Page");
const logger = require("../logger");

class FavouritePage extends Page {
    static resourcesFileName = "favouritesPage.properties";

    constructor(driver) {
        super(driver);

        this.favouritesPageUrl = null;
    }

    async loadProperties() {
        return super.loadProperties(FavouritePage.resourcesFileName);
    }

    // TODO: rework this method to only GET elements
    async checkItemExist(itemName) {
        const itemNameXpath = `//h2[contains(@class, 'ProductTitle')]//*[text()='${itemName}']`;
        await this.findByXpath(itemNameXpath);

        return this;
    }
}

module.exports = FavouritePage;