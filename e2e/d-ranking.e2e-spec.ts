/**
 * Created by stijnergeerts on 20/02/17.
 */
import {by, element, browser} from "protractor";
describe('Ranking-page', () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);

    let inputMail = element.all(by.css('#maillogin'));
    let inputPass = element.all(by.css('#passlogin'));
    let btnLogin = element(by.id('btn-login'));
    browser.get('');
    inputMail.all(by.tagName('input')).first().sendKeys("runtrackminds2017@gmail.com");
    inputPass.all(by.tagName('input')).first().sendKeys("Team102017");

    expect(inputMail.all(by.tagName('input')).first().getAttribute('value')).toEqual("runtrackminds2017@gmail.com");
    expect(inputPass.all(by.tagName('input')).first().getAttribute('value')).toEqual("Team102017");

    btnLogin.click().then(() => {
      browser.driver.sleep(6000);
    });
  });

  beforeEach(() => {
    let btnMenuNavDrawer = element(by.tagName('ion-navbar')).all(by.css('button')).get(1);
    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);
      let btnRanking = element(by.className('list')).all(by.tagName('button')).get(4);
      btnRanking.click().then(() => {
        browser.driver.sleep(4000);
      });
    });
  });


  it('should have all elements on page', () => {
    let btnWorld = element(by.id('button-world'));
    let btnFriends = element(by.id('button-friends'));
    let selectSort = element(by.id('orderby-select'));
    let rankingCard = element(by.id('ranking-card'));
    let rankingList = element(by.id('ranking-list'));
    expect(btnWorld.isPresent()).toBeTruthy();
    expect(btnFriends.isPresent()).toBeTruthy();
    expect(selectSort.isPresent()).toBeTruthy();
    expect(rankingCard.isPresent()).toBeTruthy();
    expect(rankingList.isPresent()).toBeTruthy();
  });

  afterEach(() => {
    let btnBack = element(by.css('page-ranking')).element(by.css('ion-navbar')).all(by.css('button')).first();
    btnBack.click().then(() => {
      browser.driver.sleep(1000);
    });
  });

  afterAll(() => {
    let btnMenuNavDrawer = element(by.css('ion-navbar')).all(by.css('button')).get(1);
    let btnLogout = element(by.css('ion-menu')).all(by.css('button')).get(5);

    btnMenuNavDrawer.click().then(() => {
      browser.driver.sleep(2000);

      btnLogout.click().then(() => {
        browser.driver.sleep(6000);

        browser.waitForAngularEnabled(true);
      });
    });
  });
});
