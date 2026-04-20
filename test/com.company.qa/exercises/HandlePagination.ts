import assert from "assert";
import { Builder, By, Key, until } from "selenium-webdriver";

// Problem Solving Skills - Algorithm
async function handleWindowSwitch() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://testautomationpractice.blogspot.com");
    driver.manage().window().maximize();
    driver.manage().setTimeouts({ implicit: 5000 });
    // Dynamically find a value from the table and select
    // Get the pagination
    const pagination = await driver.findElements(By.css(`#pagination > li`));

    // Loop through the elements
    for (let page = 1; page <= pagination.length; page++) {
      // Get the table
      const rows = await driver.findElements(
        By.css(`#productTable > tbody > tr`),
      );

      // Iterate through the rows
      for (let index = 1; index <= rows.length; index++) {
        // Get value from the row
        const table_name: string = await driver
          .findElement(By.css(`#productTable > tbody > tr:nth-child(${index})`))
          .getText();
        console.log(`${index} : ${rows[index]}  : ${table_name} `);

        // Compare table value to text
        if (table_name.includes("VR Headset")) {
            // If true, click the checkbox
          await driver
            .findElement(
              By.css(`#productTable > tbody > tr:nth-child(${index}) > td:nth-child(4) > input`),
            )
            .click();
          break;
        } else {
            // else go to the next page
          await driver.findElement(
            By.css(`#pagination > li:nth-child(${page})`)).click();
        }
      }
    }
  } finally {
    await driver.quit();
  }
}

handleWindowSwitch();
