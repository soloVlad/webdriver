const Page = require("./Page");

const addButtonXpath = "//button[contains(@class, 'button-buy')]";
const likeButtonXpath = "//div[contains(@class, 'product-detail-info')]//button[contains(@class, 'FavouritesButton')]";

class ItemPage extends Page {
    async clickAddButton() {
        await this.clickByXpath(addButtonXpath);

        return this;
    }

    async chooseItemSize(itemSize) {
        const sizeButtonXpath = `//div[@class='picker-option']//*[text() = '${itemSize}']`;
        await this.clickByXpath(sizeButtonXpath);

        return this;
    }

    async clickLikeButton() {
        await this.clickByXpath(likeButtonXpath);

        return this;
    }
}

module.exports = ItemPage;