const { I } = inject();

module.exports = {

  desktopSize: { width: 1600, height: 1000 },
  mobileSize: { width: 390, height: 844 },
  mostReadSection: '[data-testid="most-read"]',

  async openDesktop() {
    I.resizeWindow(this.desktopSize.width, this.desktopSize.height);
    I.amOnPage("/");

    await this.acceptCookies();

    I.waitForElement('body', 20);
    I.wait(1);
  },

  async openMobile() {
    I.resizeWindow(this.mobileSize.width, this.mobileSize.height);
    I.amOnPage("/");

    await this.acceptCookies();

    I.waitForElement('body', 20);
    I.wait(1);
  },

  async acceptCookies() {
    if (await I.grabNumberOfVisibleElements('#onetrust-accept-btn-handler') > 0) {
      I.click('#onetrust-accept-btn-handler');
      I.wait(1);
    }
  },

  async isVisibleDesktop() {
    I.waitForVisible(this.mostReadSection, 40);
  },

  async countItems() {
    I.waitForVisible(this.mostReadSection, 40);
    return I.grabNumberOfVisibleElements(`${this.mostReadSection} li`);
  }
};
