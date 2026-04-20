import { BaseTest } from "../../src/com.company.main/base/baseTest";
import assert from 'assert'

// function Sealed(constructor: Function) {
//   Object.seal(constructor);
//   Object.seal(constructor.prototype);
// }

// @Sealed
export class LoginTest extends BaseTest {
  public async loginFeature() {
    console.log("===== Starting login test ========");
    const loginInstance = super.getLoginPage();
    loginInstance.navigateLoginPage("https://www.saucedemo.com/");
    
   // assert.equal("Swag Labs".trim(), title);
    loginInstance.enterUsername("standard_user");
    loginInstance.enterPassword("secret_sauce");
    loginInstance.submit();
    loginInstance.closeLoginPage();
  }
}
