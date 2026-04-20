import { BasePage } from "./basePage";
import { By, WebDriver } from "selenium-webdriver";

export class LoginPage extends BasePage {
  protected readonly usernameField: By;
  protected passwordField: By;
  protected loginButton: By;
  protected readonly driver: WebDriver;

  constructor(driver: WebDriver) {
    super(driver);
    this.driver = driver;
    this.usernameField = By.xpath("//input[@id='user-name']");
    this.passwordField = By.css("#password");
    this.loginButton = By.css("#login-button");
  }

  public async navigateLoginPage(url: string) {
    this.waitForPageLoad(this.driver);
    this.navigation(url);
  }

  public enterUsername(username: string): void {
    this.waitUntil(this.driver, this.usernameField, "enabled").then(
      (isEnabled) => {
        console.log(isEnabled);
      },
    );
    this.sendKeys_(this.driver, this.usernameField, username);
  }
  public enterPassword(passcode: string): void {
     this.waitUntil(this.driver, this.passwordField, "visible").then(
      (isEnabled) => {
        console.log(isEnabled);
      },
    );
    this.sendKeys_(this.driver, this.passwordField, passcode);
  }

  public submit() {
    this.click_(this.driver, this.loginButton);
  }

  public closeLoginPage() {
    this.tearDown(this.driver);
  }
}
