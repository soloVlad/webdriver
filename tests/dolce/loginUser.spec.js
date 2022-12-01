const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../../services/DataReader");
const Driver = require("../../driver/Driver");

const HomePage = require("../../pages/dolce/HomePage");
const LoginPage = require("../../pages/dolce/LoginPage");
const User = require("../../models/User");
const { TEST_TIMEOUT } = require("../../config/constants");
const {log} = require("mocha-logger");

describe("Login user", () => {
    before(async function () {
        const props = await DataReader.getTestData("user.properties", "dolce");
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
                './screenshots/loginFail.png',
                image,
                'base64',
                (err) => {}
            );
        }
        await Driver.killDriver();
    })

    it("Should login user", async function() {
        const user = new User(this.userFirstName, this.userLastName, this.userEmail, this.userPassword);

        const homePage = new HomePage(this.driver);
        await homePage.loadProperties();
        await homePage.openPage();

        const loginPage = await homePage.openLoginPage(user);

        await loginPage.login();
        const accountPage = await loginPage.openMyAccount();

        const userEmailFromSite = await accountPage.getUserEmail();
        expect(userEmailFromSite).to.equal(user.getEmail());
    }).timeout(TEST_TIMEOUT * 2);
});
