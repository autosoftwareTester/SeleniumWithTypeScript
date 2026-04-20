import assert from "assert";
import { Builder, By, Key, locateWith, until } from "selenium-webdriver";
import path from "path";
async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://www.google.com/ncr");
    driver.manage().window().maximize();
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  } finally {
    await driver.quit();
  }
}

async function locatorStrategies() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "https://www.selenium.dev/documentation/webdriver/elements/locators/",
    );

    do {
      driver.manage().window().maximize();
      const downloads = await driver.findElement(By.linkText("Downloads"));
      downloads.click();
      await driver.manage().setTimeouts({ implicit: 500000 });
      await driver.navigate().back();

      // Find the element object, then locate above or below element object
      const link = locateWith(
        By.xpath("//span[normalize-space(text())='Downloads']"),
      ).below(By.xpath("(//span[normalize-space(text())='Documentation'])[1]"));

      // for (let index = 0; index < links.length; index++) {
      //   console.log(links[index].getText() + "\n");
      // }
    } while (false);
  } finally {
    await driver.quit();
  }
}

async function csslocatorStrategies() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://testautomationpractice.blogspot.com/");

    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ pageLoad: 5000 });

    const nameField = await driver.findElement(By.id("name"));
    nameField.clear();
    nameField.sendKeys("test");

    const emailField = await driver.findElement(By.id("email"));
    emailField.clear();
    emailField.sendKeys("test");

    const phoneField = await driver.findElement(By.id("phone"));
    await driver.wait(
      until.elementIsVisible(phoneField),
      5000,
      "Failed waiting for element to be visible",
      100,
    );
    let is_displyed = (await phoneField.isDisplayed()) ? true : false;

    while (is_displyed) {
      phoneField.clear();
      phoneField.sendKeys("2325555");
      is_displyed = false;
    }

    await driver.sleep(500);
    // Get element information
    let isSelected = await driver.findElement(By.id("female")).isSelected();
    if (!isSelected) {
      await driver.findElement(By.id("female")).click();

      // Get information of the element
      await driver.sleep(500);
      let background_color = await driver
        .findElement(By.className("start"))
        .getCssValue("background-color");
      console.log(`background-color: ${background_color}`);

      let locator = await driver.findElement(By.className("start"));
      await driver.wait(
        until.elementIsVisible(locator),
        500,
        " Failed to be present on web page",
        1,
      );
      // Get element text
      locator.getText();
      // Get the properties of the element object
      let locator_attribute = await locator.getAttribute("name");
      console.log(`locator attribute: ${locator_attribute}`);
      assert.equal(
        locator_attribute,
        "start",
        `${locator_attribute}Actual does not macth with expected: 'start'`,
      );
    }
    await driver.sleep(500);
  } finally {
    // Upload a file
    const image = path.resolve("./src/com.company.main/resources/omage.jpg");
    let uploadButton = await driver.findElement(By.id("singleFileInput"));
    await driver.wait(
      until.elementIsVisible(uploadButton),
      500,
      " Failed to be present on web page",
      1,
    );

    await uploadButton.sendKeys(image);
    await driver
      .findElement(By.xpath("(//button[@type='submit'])[1]"))
      .submit();

    await driver.quit();
  }
}
//example();
//locatorStrategies();
csslocatorStrategies();
