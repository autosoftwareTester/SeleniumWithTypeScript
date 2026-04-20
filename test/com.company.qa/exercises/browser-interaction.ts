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
import path from "path";

async function browserInteraction() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.navigate().to("http://www.google.com/ncr");
    await driver.manage().window().maximize();
    const title = await driver.getTitle();
    const url = await driver.getCurrentUrl();
    console.log(`Current url: ${url}`);
    let title_condition = await driver.wait(until.titleIs("Google"), 1000);
    let url_condition = await driver.wait(
      until.urlIs("https://www.google.com/"),
      1000,
    );

    if (title_condition && url_condition) {
      assert.equal(title, "Google");
      await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    }
  } finally {
    await driver.sleep(500);

    // First Locate the frame ===========IFRAMEs======================
    let iframe = await driver.findElement(
      By.xpath("//iframe[@title='reCAPTCHA' and @name]"),
    ); // advance xpath

    if (iframe) {
      // Switch into current Iframe
      await driver.switchTo().frame(iframe);
      let robot = await driver.findElement(By.id("recaptcha-anchor"));
      await robot.click();

      // Switch OUT of the current frame
      await driver.switchTo().defaultContent();

      
      // Find the IFRAME
      let captchaImage: WebElement = await driver.findElement(
        By.xpath("(//iframe[@name])[2]"),
      );

      // Wait until the iframe is locator
      await driver.wait(until.elementIsVisible(captchaImage), 500);
    
      // Switch INTO current Iframe
      await driver.switchTo().frame(captchaImage);

      // Perform actions on CAPTCHA verification image
      let verificationImage = await driver.findElement(
        By.css("div.rc-imageselect-target > table > tbody > tr:nth-child(1)"),
      );
      await driver.wait(until.elementIsVisible(verificationImage), 500);
      await driver
        .findElement(
          By.css(
            "div.rc-imageselect-target > table > tbody > tr:nth-child(1) > td:nth-child(2)",
          ),
        )
        .click();

        // Click Verify button
       // await driver.findElement(By.id("recaptcha-verify-button")).click();

        // Switch OUT of the current frame and //Go back to the main window
        await driver.switchTo().defaultContent();
    }

    await driver.close();
    await driver.quit();
  }
}

browserInteraction();
