import { By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import * as helper from "../helper/commonLibs";

type WaitCondition = "visible" | "clickable" | "enabled";

export class BasePage {
  protected readonly driver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  protected async navigation(url: string) {
    await this.driver.get(url);
    await this.driver.manage().setTimeouts({ pageLoad: helper.waitTime });
    await this.driver.manage().setTimeouts({ implicit: helper.waitTime });
    await this.driver.manage().window().maximize();
  }

  private findElement(driver: WebDriver, by: By) {
    return driver.findElement(by);
  }

  protected sendKeys_(driver: WebDriver, element: By, keys: string) {
    this.findElement(driver, element).sendKeys(keys, Key.RETURN);
  }

  protected click_(driver: WebDriver, element: By): void {
    const ele = this.findElement(driver, element);
    ele.click();
  }

  protected async getTitle(driver: WebDriver): Promise<string> {
    return await driver.getTitle();
  }

  protected async getCurrentUrl(driver: WebDriver) {
    return await driver.getCurrentUrl();
  }

  protected async tearDown(driver: WebDriver): Promise<void> {
    try {
      //  driver.close();
      await driver.quit();
    } finally {
      // driver.close();
      // driver.quit();
    }
  }

  public async performActions(driver: WebDriver, by: By) {
    const actions = driver.actions({ bridge: true });
    const element = driver.findElement(by);

    await actions.move({ origin: element, duration: 5000 }).click().perform();
  }

  public async refresh() {
    return await this.driver.navigate().refresh();
  }

  public getText(driver: WebDriver, by: By): Promise<string> {
    if (by == null) {
      throw new Error(`by is null: ${by}`);
    }
    let ele = this.findElement(driver, by);
    return ele.getText();
  }
  public async waitUntil(
    driver: WebDriver,
    by: By,
    conditionType: WaitCondition,
  ): Promise<WebElement> {
    let condition;

    switch (conditionType) {
      case "visible":
        condition = this.driver.wait(
          until.elementIsVisible(this.findElement(driver, by)),
          helper.waitTime,
        );
        break;
      case "clickable":
        condition = this.driver.wait(until.elementLocated(by));
        break;
      case "enabled":
        condition = condition = this.driver.wait(
          until.elementIsEnabled(await driver.findElement(by)),
          helper.waitTime,
        );
        break;
      default:
        throw new Error(`Condition type ${conditionType} is not supported.`);
    }

    return condition;
  }

  protected async isPageLoaded(driver: WebDriver): Promise<boolean> {
    const readState = await driver.executeScript<string>(
      "return document.readyState;",
    );
    return readState === "complete";
  }

  protected async waitForPageLoad(driver: WebDriver): Promise<void> {
    await driver.wait(
      async () => {
        const state = await driver.executeScript("return document.readyState");
        return state === "complete";
      },
      helper.waitTime,
      "Page failed to load",
    );
  }
  public async back(driver: WebDriver) {
    return await driver.navigate().back();
  }
  public async forward() {
    return await this.driver.navigate().forward();
  }

  public async isVisible(element: any) {
    try {
      await this.driver.wait(() => {
        return element.isDisplayed();
      }, 5000);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async waitForElement(element: any, timeout: number = 5000) {
    try {
      await this.driver.wait(() => {
        return element.isDisplayed();
      }, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async waitForElementToBeClickable(
    element: any,
    timeout: number = 5000,
  ) {
    try {
      await this.driver.wait(() => {
        return element.isDisplayed() && element.isEnabled();
      }, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async waitForElementToDisappear(element: any, timeout: number = 5000) {
    try {
      await this.driver.wait(() => {
        return element.isDisplayed().then((displayed: boolean) => !displayed);
      }, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async waitForTitle(title: string, timeout: number = 5000) {
    try {
      await this.driver.wait(() => {
        return this.driver
          .getTitle()
          .then((currentTitle: string) => currentTitle === title);
      }, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async selectDropdownByValue(element: any, value: string) {
    await element.findElement({ css: `option[value="${value}"]` }).click();
  }
}
