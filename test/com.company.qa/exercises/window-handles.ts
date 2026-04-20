// Problem Statement - Get browser Information
import assert from "assert";
import {
  Builder,
  By,
  Key,
  locateWith,
  until,
  WebElement,
} from "selenium-webdriver";

async function work_with_windows() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.navigate().to("https://testautomationpractice.blogspot.com/");
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ pageLoad: 50000 });

    // Store the uique ID of the first window
    let parentWindow = await driver.getWindowHandle();

    await driver.sleep(500);
    // Click button to open new tab
    let newTab = await driver.findElement(By.css("#HTML4"));

    // Release all actions
   // await driver.actions().clear();

    // // Get all window unique ID's
    // let windowsHandles: string[] = await driver.getAllWindowHandles();

    // for (let handle of windowsHandles) {
    //   if (handle == parentWindow) {
    //     // Switch to the new window
    //     await driver.switchTo().window(handle);

    //     // Perform all actions

    //     // Close the window
    //     await driver.close();
    //     // Switch back to the parent window
    //     await driver.switchTo().window(parentWindow);
    //   }
    // }

    console.log(`Parent Window: ${parentWindow}`);
  } finally {
    await driver.quit();
  }
}
work_with_windows();
