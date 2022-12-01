const { By, Key } = require("selenium-webdriver");
const logger = require("../../logger");

const Page = require("./Page");

class HomePage extends Page {
    static resourcesFileName = "homePage.properties";

    constructor(driver) {
        super(driver);

        this.homePageUrl = null;
    }

    async loadProperties() {
        return super.loadProperties(HomePage.resourcesFileName);
    }

    async openPage() {
        return super.openPage(this.homePageUrl);
    }
}

module.exports = HomePage;