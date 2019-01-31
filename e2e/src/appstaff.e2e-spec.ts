import { AppPage, getEventBtn} from './app.po';
import { browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

describe('Protractor staff account e2e test', () => {
  let page: AppPage;
  const cards = element.all(by.css('app-event-card'));
  //const tabs = element.all(by.css('app-profile-nav-item'));
  const firstCard = cards.get(0);
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display landing page', () => {
    page.navigateTo();
    expect(page.getEventText()).toEqual('Events');
  });

  it('clicking on first card title', () => {
    firstCard.click();
    expect(firstCard.getText());
  });

  it('click on enroll', () => {
    const enrollbtn = getEventBtn('Enroll');
    enrollbtn.click();
  });

  it('click on unenroll', () => {
    const unenroll = getEventBtn('Unenroll');
    unenroll.click();
  });

  //Failed: element not interactable inconsistencies
  it('click on close', () => {
    const closecard = getEventBtn('Close');
    closecard.click();
  });

  it('create an event', () => {
        
  });

  it('should go into profile page', () => {
    page.navigateTo();
    //expect(page.getProfileSidebar().click());
    page.getProfileSidebar().click();
    expect(page.getProfileText()).toEqual('Profile');
  });

  it('should go into leaderboard page', () => {
    page.getLeaderboardPage();
    expect(page.getLeaderboardText()).toEqual('Leaderboard');
  });

  it('should go into rewards page', () => {
    page.getRewardsPage();
    expect(page.getRewardsText()).toEqual('Rewards');
  });

  it('should go into Logout page', () => {
    page.getLogoutPage();
  });

});  
