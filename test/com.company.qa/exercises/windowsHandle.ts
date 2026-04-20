import assert from "assert";
import { Builder, By, Key, until } from "selenium-webdriver";

async function handleWindowSwitch() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://testautomationpractice.blogspot.com");
    driver.manage().window().maximize();

    // Get parent window
    const parent = await driver.getWindowHandle();
    const newTab = await driver.findElement(
      By.xpath("//button[normalize-space(text())='New Tab']"),
    );
    newTab.click();

    // Get child window
    const children = await driver.getAllWindowHandles();
    for (let child of children) {
      // Get the current window object and compare with the parent
      if (child !== parent) {
        // if true - Switch to the new window
        await driver.switchTo().window(child);
        const child_window_title = await driver.getTitle();
        await driver.wait(until.titleIs("SDET-QA Blo"), 1000);
        assert.equal(child_window_title, "SDET-QA Blo");
        // close the child window
        await driver.close();

        // switch back to parent window
        await driver.switchTo().window(parent);
        const parent_window_title = await driver.getTitle();
        await driver.wait(until.titleIs("Automation Testing Practice"), 1000);
        assert.equal(child_window_title, "Automation Testing Practice");
      }
    }
  } finally {
    await driver.quit();
  }
}

handleWindowSwitch();
