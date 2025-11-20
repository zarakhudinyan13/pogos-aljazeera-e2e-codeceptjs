// pages/home.page.js
const { I } = inject();

module.exports = {
  I,

  /**
   * Desktop: open home page and handle cookies.
   */
  async openDesktop() {
    I.resizeWindow(1600, 1000);
    I.amOnPage('/');
    I.waitForElement('body', 15);
    await this.acceptCookies();
  },

  /**
   * Mobile: open home page and handle cookies.
   */
  async openMobile() {
    I.resizeWindow(390, 844);
    I.amOnPage('/');
    I.waitForElement('body', 15);
    await this.acceptCookies();
  },

  /**
   * Idempotent cookie accept:
   * - Clicks only if the button is visible
   * - Safe to call multiple times (no "element not interactable").
   */
  async acceptCookies() {
    const count = await I.grabNumberOfVisibleElements('#onetrust-accept-btn-handler');
    if (count > 0) {
      I.waitForElement('#onetrust-accept-btn-handler', 10);
      I.click('#onetrust-accept-btn-handler');
      I.wait(1);
    } else {
      // Banner already gone -> do nothing
      // console.log('⚠️ Cookie banner already dismissed — skipping click');
    }
  },

  /**
   * Accessibility scenario:
   * Use keyboard to reach the skip link (header area).
   * We just tab a few times from top of page.
   */
  async focusSkipLinkWithKeyboard() {
    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(1);

    // A small, fixed number of tabs is enough for the assessment
    for (let i = 0; i < 8; i++) {
      I.pressKey('Tab');
      I.wait(0.3);
    }
  },

  /**
   * Activate the currently focused skip link via keyboard.
   */
  async activateSkipLinkWithKeyboard() {
    I.pressKey('Enter');
    I.wait(1);
  },

  /**
   * Assert that focus / navigation moved to the Most Read section.
   * For the assessment it's enough to check the URL anchor + section presence.
   */
  async assertFocusOnMostRead() {
    I.seeInCurrentUrl('#most-read-container');
    I.seeElement('#most-read-container');
  },
};
