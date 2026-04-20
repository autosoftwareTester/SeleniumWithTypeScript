// Problem Statement - Get browser Information
import assert from "assert";
import { Builder, By, Key, locateWith, until } from "selenium-webdriver";

async function alertHandle() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.navigate().to("https://testautomationpractice.blogspot.com/");
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ pageLoad: 5000 });

    // Problem Statement/Ask Handle Alert
    // Find & Click
    const prompt_alert_button = await driver.findElement(
      By.xpath("//button[@id='alertBtn']"),
    );
    let is_alert_pop_up = await prompt_alert_button.isEnabled();
    if (is_alert_pop_up) {
      await prompt_alert_button.click();

      // Switch to alert
      let alert = await driver.switchTo().alert();
      ///alert.accept(); //Accept alert
      alert.dismiss(); //Cancel alert

      // Get alert text
      let alertText = await alert.getText();
      console.log("Alert: " + alertText);

      await driver.manage().setTimeouts({ implicit: 5000 });
    }
  } finally {
    // Prompt Alert

    // Find and click element Object
    let prompt_alert = await driver.findElement(By.id("promptBtn"));
    await prompt_alert.click();
    // Check for alert information
    let alert_present = await driver.wait(until.alertIsPresent(), 5000);

    console.log("Alert : " + alert_present);
    if (alert_present) {
      await alert_present.sendKeys("sam is cool");
      await alert_present.accept();
    }
    await driver.quit();
  }
}

alertHandle();
