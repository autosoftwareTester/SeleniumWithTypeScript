import console from "node:console";
import {
  Builder,
  By,
  Key,
  locateWith,
  until,
  WebElement,
} from "selenium-webdriver";

async function webtable_UserPromptHandler() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.navigate().to("https://testautomationpractice.blogspot.com/");

    // Webtable
    const webtable = await driver.findElements(
      By.css("[name=BookTable] > tbody > tr > th"),
    );

    for (let index = 0; index < webtable.length; index++) {
        const element = webtable[index];
        console.log(await element.getText())
    }
   
  } finally {
    await driver.quit();
  }
}

webtable_UserPromptHandler();
