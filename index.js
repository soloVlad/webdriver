const webdriver = require("selenium-webdriver");
const { By, Key, until } = webdriver;

const chai = require("chai");
const expect = chai.expect;

const capabilities = require("./capabilities.json");

const siteURL = "https://www2.hm.com/en_gb/index.html";
const bstackURL = "http://vladsolovey_nLDfEK:mF4DwzGRk2vE1B86U8rs@hub-cloud.browserstack.com/wd/hub";
const searchInputFieldPath = "//div[contains(@class, 'SearchBar-module--visibleDesktop')][not(ancestor::ul)]//input[@placeholder='Search products']";
const acceptCookiesPath = "//*[@id='onetrust-accept-btn-handler']";
const searchedElementsPath = "//*[@class='hm-product-item']//a[text()='Regular Fit Ripstop cargo trousers']";
const searchedProduct = "Regular Fit Ripstop cargo trousers";

describe("Search product test", () => {

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

        await returnBstackResult(
            driver,
            searchedElements.length !== 0,
            "Products were found successfully!",
            "Some elements failed to load!",
        );

        await driver.quit();
        expect(searchedElements).to.not.be.empty;
    }).timeout(60000);
})

async function returnBstackResult(driver, result, successMsg, failMsg) {
    let status = result ? "passed" : "failed";
    let msg = result ? successMsg : failMsg;

    await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"${status}","reason": "${msg}"}}`
    );
}
