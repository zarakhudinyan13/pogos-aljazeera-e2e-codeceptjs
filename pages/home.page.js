const { I } = inject();

module.exports = {
  homePath: "/",
  livePath: "/live",

  selectors: {
    header: "header",
    skipMenuLink: 'a[href="#most-read-container"]',
    cookieAcceptBtn: "#onetrust-accept-btn-handler", // REAL UI COOKIE BUTTON
    cookieBanner: "#onetrust-consent-sdk",
  },

  /**
   * ===== GENERIC PAGE HANDLERS =====
   */

  async waitForPageReady() {
    I.waitForElement("body", 10);
    I.wait(2); // allow lazy ads/api/UI shifts
  },

  async handleCookies() {
    const isVisible = await I.grabNumberOfVisibleElements(this.selectors.cookieBanner);

    if (isVisible > 0) {
      console.log("🍪 Cookie banner detected — accepting...");
      I.waitForElement(this.selectors.cookieAcceptBtn, 5);
      I.click(this.selectors.cookieAcceptBtn);
      I.wait(1);
    } else {
      console.log("✔ No cookie banner detected.");
    }
  },

  /**
   * ===== PAGE NAVIGATION =====
   */

  async openHomeDesktop() {
    console.log("🌍 Opening HOME page in desktop layout...");
    I.resizeWindow(1600, 1000);
    I.amOnPage(this.homePath);

    await this.waitForPageReady();
    await this.handleCookies();
  },

  async openHomeMobile() {
    console.log("📱 Opening HOME page in mobile layout...");
    I.resizeWindow(375, 812);
    I.amOnPage(this.homePath);

    await this.waitForPageReady();
    await this.handleCookies();
  },

  async openLiveDesktop() {
    console.log("🎥 Opening LIVE page in desktop layout...");
    I.resizeWindow(1600, 1000);
    I.amOnPage(this.livePath);

    await this.waitForPageReady();
    await this.handleCookies();
  },

  /**
   * ===== ACCESSIBILITY FEATURES =====
   */

  async openBypassBlocksMenu() {
    console.log("🎯 Opening Bypass Blocks Menu...");

    I.click(this.selectors.header);
    I.pressKey("Tab");
    I.pressKey("Tab");
    I.pressKey("Enter");

    I.wait(1);
  },

  async clickSkipMenu() {
    console.log(`➡ Clicking Skip link: ${this.selectors.skipMenuLink}`);
    
    I.waitForElement(this.selectors.skipMenuLink, 10);
    I.click(this.selectors.skipMenuLink);
    I.wait(1);
  }
};
