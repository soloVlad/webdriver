const Page = require("./Page");
const logger = require("../logger");

class ItemPage extends Page {
    static addButtonXpath = "//button[contains(@class, 'button-buy')]";
    static likeButtonXpath = "//div[contains(@class, 'product-detail-info')]//button[contains(@class, 'FavouritesButton')]";
    static resourcesFileName = "item.properties";

    constructor(driver, item) {
        super(driver);

        this.item = item;
    }

    async openPage() {
        return super.openPage(this.item.getPageUrl());
    }

    async clickAddButton() {
        logger.info("Clicking add button.");
        await this.clickByXpath(ItemPage.addButtonXpath);

        return this;
    }

    async chooseItemSize(itemSize) {
        logger.info(`Choosing ${itemSize} item size.`);
        const sizeButtonXpath = `//div[@class='picker-option']//*[text() = '${itemSize}']`;
        await this.clickByXpath(sizeButtonXpath);

        return this;
    }

    async clickLikeButton() {
        logger.info("Clicking like button.");
        await this.clickByXpath(ItemPage.likeButtonXpath);

        return this;
    }
}

module.exports = ItemPage;