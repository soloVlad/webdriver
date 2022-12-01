const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../../services/DataReader");
const Driver = require("../../driver/Driver");

const ItemPage = require("../../pages/dolce/ItemPage");
const Item = require("../../models/Item");
const { TEST_TIMEOUT } = require("../../config/constants");

describe("Add to cart", () => {
    before(async function () {
        const props = await DataReader.getTestData("item.properties", "dolce");
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
            await require('fs').writeFile(
                './screenshots/DolceLoginFail.png',
                image,
                'base64',
                (err) => {}
            );
        }
        await Driver.killDriver();
    })

    it("Should add to cart", async function() {
        const item = new Item(this.itemName, this.itemId, this.itemUrl);

        const itemPage = new ItemPage(this.driver, item);
        await itemPage.openPage();
        await itemPage.clickAddToCart();
        await itemPage.selectSize();

        const cartItems = await itemPage.getCartItems();

        expect(cartItems).to.have.members([item.getName().toLowerCase()]);
    }).timeout(TEST_TIMEOUT * 2);
});
