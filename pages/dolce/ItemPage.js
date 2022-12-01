const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");

class ItemPage extends Page {
    static addToCartXpath = "//button[@title='Add to cart']";
    static sizeXpath = "//div[contains(@class, 'slide-flyout-wrapper')]//a[@title='48']";
    static cartItemHeadingXpath = "//a[contains(@class, 'b-product-tile_link')]";

    constructor(driver, item) {
        super(driver);

        this.item = item;
    }

    async openPage() {
        return super.openPage(this.item.url);
    }

    async selectSize() {
        logger.info("Selecting size.");
        await this.clickByXpath(ItemPage.sizeXpath);

        return this;
    }

    async clickAddToCart() {
        logger.info("Adding to cart.");
        await this.clickByXpath(ItemPage.addToCartXpath);

        return this;
    }

    async getCartItems() {
        return this.getAllElementsText("Getting elements in cart.", ItemPage.cartItemHeadingXpath);
    }
}

module.exports = ItemPage;