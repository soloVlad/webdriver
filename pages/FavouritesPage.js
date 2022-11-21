const Page = require("./Page");

class FavouritePage extends Page {
    async checkItemExist(itemName) {
        const itemNameXpath = `//h2[contains(@class, 'ProductTitle')]//*[text()='${itemName}']`;
        await this.findByXpath(itemNameXpath);

        return this;
    }
}

module.exports = FavouritePage;