import { browser, by, element } from 'protractor';

export class AppPage {


  navigateTo() {
    return browser.get('/');
  }

  navigateToProfile() {
    return browser.get('/portal/profile');
  }

  getEventText() {
    return element(by.css('app-events h1')).getText();
  }

  getLeaderboardText() {
    return element(by.css('app-leaderboard h1')).getText();
  }

  getRewardsText() {
    return element(by.css('app-rewards h1')).getText();
  }

  getProfileText() {
    return element(by.css('app-profile h1')).getText();
  }
  
  getProfileSidebar() {
    return element(by.css('[routerlink="/portal/profile"]'));
  }

  getBadgesTab() {
    return element(by.css('app-profile li:nth-of-type(2)')).getText();
  }

  clickBadgesTab() {
    return element(by.css('app-profile li:nth-of-type(2)')).click();
  }

  getLeaderboardPage() {
    return element(by.css('li:nth-of-type(4)')).click();
  }

  getRewardsPage() {
    return element(by.css('li:nth-of-type(6)')).click();
  }

}

export function getProfileBadge(tabName: string): any {
    return element(by.id('badges-tab')).all(by.anchor(tabName));
  }

export function getEventBtn(btnName: string): any {
    return element(by.className('modal-footer')).all(by.buttonText(btnName));
  }
