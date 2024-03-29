import {by, element, browser} from "protractor";
describe('Login page - general', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Login');
  });

  it('should have navbar', () => {
    let navBar = element(by.tagName('ion-navbar'));
    expect(navBar.isPresent()).toBeTruthy();
  });

  it('test navbar title', () => {
    let navBarTitle = element.all(by.css('ion-title')).get(1);

    expect(navBarTitle.isPresent()).toBeTruthy();
    expect(navBarTitle.getText()).toBe('Login');
  });

  it('should have segmentBar', () => {
    let segmentBar = element(by.tagName('ion-segment'));
    expect(segmentBar.isPresent()).toBeTruthy();
  });

  it('segmentBar should have segmentBar buttons', () => {
    let segmentBarButtons = element.all(by.tagName('ion-segment-button'));
    expect(segmentBarButtons.count()).toBe(2);
  });

  it('test segmentBar buttons', () => {
    let segmentBarLoginButton = element.all(by.tagName('ion-segment-button')).first();
    let segmentBarSingUpButton = element.all(by.tagName('ion-segment-button')).last();

    segmentBarSingUpButton.click().then(() => {
      browser.driver.sleep(2000);
      expect(element.all(by.tagName('ion-card')).count()).toBe(1);
      /*let cardViewTitle = element.all(by.tagName('ion-card')).count();
      expect(cardViewTitle.getText()).toBe('Sign up');*/
    });

    segmentBarLoginButton.click().then(() => {
      browser.driver.sleep(2000);
      expect(element.all(by.tagName('ion-card')).count()).toBe(2);
      /*let cardViewTitle = element(by.tagName('ion-card-title'));
      expect(cardViewTitle.getText()).toBe('Login');*/
    });
  });
});

describe('Login page - login form', () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
  });

  beforeEach(() => {
    browser.get('');
  });

  let btnAuthGoogle = element(by.id('authGoogle'));
  it('has google login button', () => {
    expect(btnAuthGoogle.isPresent()).toBeTruthy();
  });

  it('test google login authentication', () => {
    btnAuthGoogle.click().then(() => {
      browser.driver.sleep(2000); // wait for page redirect
      expect(browser.navigate()).toBeTruthy();
    });
  });

  let btnAuthFacebook = element(by.id('authFacebook'));
  it('has facebook login button', () => {
    expect(btnAuthFacebook.isPresent()).toBeTruthy();
  });

  it('test facebook login authentication', () => {
    btnAuthFacebook.click().then(() => {
      browser.driver.sleep(2000); // wait for page redirect
      expect(browser.navigate()).toBeTruthy();
    });
  });

  let inputMail = element.all(by.css('#maillogin'));
  let inputPass = element.all(by.css('#passlogin'));
  it('has mail/pass login fields', () => {
    expect(inputMail.isPresent()).toBeTruthy();
    expect(inputPass.isPresent()).toBeTruthy();
  });

  let btnLogin = element(by.id('btn-login'));
  it('should have login button', () => {
    expect(btnLogin.isPresent()).toBeTruthy();
    expect(btnLogin.getText()).toBe('LOGIN');
  });

  it('test login mail/pass authentication (nothing)', () => {
    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(element.all(by.css('ion-title')).get(1).getText()).toEqual("Login");

      let alert = element(by.tagName('ion-alert'));

      expect(alert.isPresent()).toBeTruthy();

      expect(alert.element(by.className("alert-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-title")).getText()).toEqual('Login error');
      expect(alert.element(by.className("alert-sub-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-sub-title")).getText()).toEqual("An error has occurred while logging in.");

      let btnOk = alert.element(by.tagName("button"));
      expect(btnOk.isPresent()).toBeTruthy();
      expect(btnOk.getText()).toBe("OK");
      btnOk.click().then(() => {
        browser.driver.sleep(2000);
        expect(alert.isPresent()).toBeFalsy();
      })
    });
  });

  it('test login mail/pass authentication (no mailaddress)', () => {
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(element.all(by.css('ion-title')).get(1).getText()).toEqual("Login");

      let alert = element(by.tagName('ion-alert'));

      expect(alert.isPresent()).toBeTruthy();

      expect(alert.element(by.className("alert-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-title")).getText()).toEqual('Login error');
      expect(alert.element(by.className("alert-sub-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-sub-title")).getText()).toEqual("An error has occurred while logging in.");

      let btnOk = alert.element(by.tagName("button"));
      expect(btnOk.isPresent()).toBeTruthy();
      expect(btnOk.getText()).toBe("OK");
      btnOk.click().then(() => {
        browser.driver.sleep(2000);
        expect(alert.isPresent()).toBeFalsy();
      })
    });
  });

  it('test login mail/pass authentication (no password)', () => {
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("");

    btnLogin.click().then(() => {
      browser.driver.sleep(2000);
      expect(element.all(by.css('ion-title')).get(1).getText()).toEqual("Login");

      let alert = element(by.tagName('ion-alert'));

      expect(alert.isPresent()).toBeTruthy();

      expect(alert.element(by.className("alert-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-title")).getText()).toEqual('Login error');
      expect(alert.element(by.className("alert-sub-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-sub-title")).getText()).toEqual("An error has occurred while logging in.");

      let btnOk = alert.element(by.tagName("button"));
      expect(btnOk.isPresent()).toBeTruthy();
      expect(btnOk.getText()).toBe("OK");
      btnOk.click().then(() => {
        browser.driver.sleep(2000);
        expect(alert.isPresent()).toBeFalsy();
      })
    });
  });

  it('test login mail/pass authentication', () => {
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(6000);
      expect(element.all(by.css('ion-navbar')).first().isPresent()).toBeTruthy();

      expect(element.all(by.css('ion-title')).get(1).getText()).toBe("Home");

      let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
      btnMenuNavDrawer.click().then(() => {
        browser.driver.sleep(2000);

        let btnLogout = element(by.tagName('ion-menu')).element(by.tagName('ion-list')).all(by.tagName('button')).last();
        btnLogout.click().then(() => {
          browser.driver.sleep(6000);
        });
      });
    });
  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);
  });
});

describe('Login page - sign up form', () => {
  beforeEach(() => {
    browser.get('');

    let segmentBarSingUpButton = element.all(by.tagName('ion-segment-button')).get(1);
    segmentBarSingUpButton.click().then(() => browser.driver.sleep(2000));
  });

  let inputMail = element.all(by.css('#mailsignup'));
  let inputPass = element.all(by.css('#passsignup'));
  it('has mail/pass sign up fields', () => {
    expect(inputMail.isPresent()).toBeTruthy();
    expect(inputPass.isPresent()).toBeTruthy();
  });

  let btnSignUp = element(by.id('btn-signup'));
  it('should have sign up button', () => {
    expect(btnSignUp.isPresent()).toBeTruthy();
    expect(btnSignUp.getText()).toBe('SIGN UP');
  });

  it('test login mail/pass authentication (shouldn\'t sign up)', () => {
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnSignUp.click().then(() => {
      browser.driver.sleep(6000);
      expect(element.all(by.css('ion-title')).get(1).getText()).toEqual("Login");

      let alert = element(by.tagName('ion-alert'));

      expect(alert.isPresent()).toBeTruthy();

      expect(alert.element(by.className("alert-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-title")).getText()).toEqual('Sign up error');
      expect(alert.element(by.className("alert-sub-title"))).toBeTruthy();
      expect(alert.element(by.className("alert-sub-title")).getText()).toEqual("An error has occurred while signing up.");

      let btnOk = alert.element(by.tagName("button"));
      expect(btnOk.isPresent()).toBeTruthy();
      expect(btnOk.getText()).toBe("OK");
      btnOk.click().then(() => {
        browser.driver.sleep(2000);
        expect(alert.isPresent()).toBeFalsy();
      })
    });
  });
});
