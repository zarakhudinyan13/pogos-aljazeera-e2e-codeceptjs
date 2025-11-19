const { I } = inject();

module.exports = {
  livePath: "/live",

  playerContainer:
    '[data-testid="live-stream-player"], .video-container, video',

  switchButton: 'button=Switch player',

  openLiveDesktop() {
    I.resizeWindow(1440, 900);
    I.amOnPage(this.livePath);
  },

  seePlayerVisible() {
    I.waitForElement(this.playerContainer, 15);
    I.seeElement(this.playerContainer);
  },

  seeSwitchButtonVisible() {
    I.waitForElement(this.switchButton, 10);
    I.seeElement(this.switchButton);
  }
};
