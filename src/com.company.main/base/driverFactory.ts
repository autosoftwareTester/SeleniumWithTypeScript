import { Browser, Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import * as edge from "selenium-webdriver/edge";

export class DriverFactory {
  private driver!: WebDriver;

  private edgeOptions(isHeadless: boolean = false) {
    let options = new edge.Options();
    options.addArguments("--headless=new");
    return options;
  }
  private chromeOptions(isHeadless: boolean = false) {
    let options = new chrome.Options();
    if (isHeadless) {
      // Modern Headless Mode
      options.addArguments("--headless=new");
    } else {
      options.addArguments("--start-maximized"); // Opens Chrome in maximize mode
      options.addArguments("--incognito"); // Use incognito mode
      options.addArguments("--disable-extensions");
      options.addArguments("--disable-popup-blocking");
      // Essential for Linux/Container environments (Docker)
      options.addArguments("--no-sandbox");
      options.addArguments("--disable-dev-shm-usage");
      options.addArguments("--disable-gpu");
      options.setBrowserVersion("stable");
      options.setAcceptInsecureCerts(true);
      options.excludeSwitches("enable-automation");
    }

    return options;
  }

  public createDriver(browser: string = "chrome"): WebDriver {
    const chrome_options = this.chromeOptions();

    let service = null;

    switch (browser) {
      case "chrome":
        let cap = chrome_options.setPageLoadStrategy("normal");
        console.log(`$Proxy Server: ${cap.getProxy()}`);

        service = new chrome.ServiceBuilder();

        this.driver = new Builder()
          .forBrowser(Browser.CHROME)
          .setChromeOptions(chrome_options)
          .setChromeService(service)
          .build();
        console.log(
          `Started Client and Server session: ${this.driver.getSession()}`,
        );
        break;
      case "edge":
        let options = this.edgeOptions();
        this.driver = new Builder()
          .forBrowser(Browser.EDGE)
          .setEdgeOptions(options)
          .build();
      default:
        throw new Error(`Unsupported Browser: ${browser}`);
    }

    return this.driver;
  }
}
