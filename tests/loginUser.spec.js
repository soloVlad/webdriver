const chai = require("chai");
chai.should();
chai.use(require("chai-things"));
const { expect } = require("chai");

const DataReader = require("../services/DataReader");
const Driver = require("../driver/Driver");

const LoginPage = require("../pages/LoginPage");
const User = require("../models/User");
const { TEST_TIMEOUT } = require("../config/constants");
const {log} = require("mocha-logger");

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
        const loginPage = new LoginPage(
            this.driver,
            new User(this.userFirstName, this.userLastName, this.userEmail, this.userPassword)
        );
        await loginPage.loadProperties();
        await loginPage.openPage();
        await loginPage.login();

        // TODO: implement check
    }).timeout(TEST_TIMEOUT);
});
