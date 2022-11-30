const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../../services/DataReader");
const Driver = require("../../driver/Driver");

const LoginPage = require("../../pages/hm/LoginPage");
const SettingsPage = require("../../pages/hm/SettingsPage");
const User = require("../../models/User");
const { TEST_TIMEOUT } = require("../../config/constants");

describe("Login user", () => {
    before(async function () {
        const props = await DataReader.getTestData("user.properties");
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

    it("Should login user", async function() {
        const user = new User(this.userFirstName, this.userLastName, this.userEmail, this.userPassword);

        const loginPage = new LoginPage(this.driver, user);
        await loginPage.loadProperties();
        await loginPage.openPage();
        await loginPage.acceptCookies();

        const accountPage = await loginPage.login();
        // const settingsPage = await accountPage.openSettingsPage();
        // const userEmailFromSite = await settingsPage.getUserEmail();

        //expect(userEmailFromSite).to.equal(user.getEmail());
    }).timeout(TEST_TIMEOUT);
});
