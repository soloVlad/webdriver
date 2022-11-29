const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const ItemPage = require("../pages/ItemPage");
const FavouritesPage = require("../pages/FavouritesPage");
const Item = require("../models/Item");
const { TEST_TIMEOUT } = require("../config/constants");

describe("Add to favourites", () => {
    before(async function () {
        const props = await DataReader.getTestData("item.properties");
        for (const key in props) {
            this[key] = props[key];
        }
    });

    beforeEach(async function() {
        this.driver = await Driver.getInstance();
    })

    afterEach(async function() {
        await Driver.killDriver();
    })

    it("Should add to favourites", async function() {
        const itemPage = new ItemPage(
            this.driver,
            new Item(this.itemName, this.itemId));
        await itemPage.openPage();
        await itemPage.acceptCookies();
        await itemPage.clickLikeButton();

        const favouritesPage = new FavouritesPage(this.driver);
        await favouritesPage.loadProperties();
        await favouritesPage.openPage();
        const favouriteItemsHeadings = await favouritesPage.getFavouritesItemsHeadings();

        expect(favouriteItemsHeadings).to.have.members([this.itemName]);
    }).timeout(TEST_TIMEOUT);
});
