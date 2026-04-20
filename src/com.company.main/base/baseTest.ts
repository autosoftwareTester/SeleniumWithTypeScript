import * as baseTest from "../../com.company.main/pages/index";
import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "./driverFactory";

export class BaseTest {
  private readonly driver: WebDriver;

  constructor() {
    this.driver = new DriverFactory().createDriver();
  }

  protected getLoginPage(): baseTest.LoginPage {
    return new baseTest.LoginPage(this.driver);
  }
}
