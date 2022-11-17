const webdriver = require("selenium-webdriver");
const { By, Key, until } = webdriver;

const chai = require("chai");
const expect = chai.expect;

const siteURL = "https://www2.hm.com/en_gb/index.html";
const bstackURL = "http://vladsolovey_nLDfEK:mF4DwzGRk2vE1B86U8rs@hub-cloud.browserstack.com/wd/hub";
const searchInputFieldPath = "//div[@class='SearchBar-module--visibleDesktop__2xYv6'][not(ancestor::ul)]//input[@placeholder='Search products']";
const acceptCookiesPath = "//*[@id='onetrust-accept-btn-handler']";
const searchedElementsPath = "//*[@class='hm-product-item']//a[text()='Regular Fit Ripstop cargo trousers']";
const searchedProduct = "Regular Fit Ripstop cargo trousers";

describe("Search product test", () => {

    const capabilities = {
        'bstack:options' : {
            "os": "Windows",
            "osVersion": "11",
            "buildName" : "browserstack-build-1",
            "sessionName" : "Parallel test 1",
        },
        "browserName": "Chrome",
        "browserVersion": "103.0",
    };

    it("Should contain products", async function() {
        let driver = new webdriver.Builder()
            .usingServer(bstackURL)
            .withCapabilities({
                ...capabilities,
                ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
            })
            .build();

        await driver.get(siteURL);
        await driver.manage().window().maximize();
        await driver.findElement(By.xpath(acceptCookiesPath)).click();

        await driver.wait(until.elementLocated(By.xpath(searchInputFieldPath)), 5000);
        await driver.findElement(By.xpath(searchInputFieldPath)).click();
        await driver.findElement(By.xpath(searchInputFieldPath)).sendKeys(searchedProduct, Key.ENTER);

        await driver.wait(until.elementLocated(By.xpath(searchedElementsPath)), 5000);
        let searchedElements = await driver.findElements(By.xpath(searchedElementsPath));

        if (searchedElements.length === 0) {
            await driver.executeScript(
                'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load!"}}'
            );
        }
        else {
            await driver.executeScript(
                'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Products were found successfully!"}}'
            );
        }

        await driver.quit();
        expect(searchedElements).to.not.be.empty;
    }).timeout(60000);
})

