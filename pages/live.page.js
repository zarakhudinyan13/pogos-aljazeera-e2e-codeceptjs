const { I } = inject();

module.exports = {

  livePath: "/live",

  playerContainer: '[data-testid="live-stream-player"], .video-container, video',

  switchButton: locate('button').withText('Switch'), // safer than exact text

  async openLiveDesktop() {
    I.resizeWindow(1440, 900);
    I.amOnPage(this.livePath);

    // Accept cookies if shown
    if (await I.grabNumberOfVisibleElements('#onetrust-accept-btn-handler') > 0) {
      I.click('#onetrust-accept-btn-handler');
      I.wait(1);
    }

    I.waitForElement('body', 10);
  },

  async seePlayerVisible() {
    I.waitForElement(this.playerContainer, 30);
    I.seeElement(this.playerContainer);
  },

  async seeSwitchButtonVisible() {
    I.waitForElement(this.switchButton, 20);
    I.seeElement(this.switchButton);
  }
};
