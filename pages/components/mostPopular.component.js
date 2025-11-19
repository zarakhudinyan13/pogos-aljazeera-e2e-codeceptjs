const { I } = inject();

module.exports = {
  selectors: {
    root: "#most-read-container",

    title:
      "//h2[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'most')]",

    postItems: "#most-read-container .trending-articles__list li",

    cookieModal: '[role="dialog"][aria-label*="truth"]',
    acceptButton: '#onetrust-accept-btn-handler',
    closeButton: '#onetrust-close-btn-container',
  },

  async handleCookieIfDisplayed() {
    const modalVisible = await I.grabNumberOfVisibleElements(this.selectors.cookieModal).catch(() => 0);
    if (modalVisible > 0) {
      console.log("🍪 Cookie banner detected — handling...");

      const acceptExists = await I.grabNumberOfVisibleElements(this.selectors.acceptButton).catch(() => 0);
      if (acceptExists > 0) {
        I.click(this.selectors.acceptButton);
        I.wait(1);
      }

      const closeExists = await I.grabNumberOfVisibleElements(this.selectors.closeButton).catch(() => 0);
      if (closeExists > 0) {
        I.click(this.selectors.closeButton);
        I.wait(1);
      }

      console.log("🍪 Cookie modal cleared.");
    }
  },

async scrollUntilVisible() {
   for (let i = 0; i < 15; i++) {
    const visible = await I.grabNumberOfVisibleElements(this.selectors.root).catch(() => 0);
    if (visible > 0) {
      console.log(`📌 Section found after scroll #${i + 1}`);
      return;
    }

    I.scrollPageToBottom();
    I.wait(2); // increased for dynamic ads/content
  }

  throw new Error("❌ Could not locate Most Popular section after scrolling.");
   }
    ,

  async seeVisibleDesktop() {
    await this.handleCookieIfDisplayed();
    await this.scrollUntilVisible();
    I.waitForElement(this.selectors.title, 12);
    I.seeElement(this.selectors.root);
  },

  async seeExactlyTenPosts() {
    await this.handleCookieIfDisplayed();
    await this.scrollUntilVisible();
    I.waitForElement(this.selectors.postItems, 15);

    const count = await I.grabNumberOfVisibleElements(this.selectors.postItems);
    console.log(`📊 Found ${count} posts`);

    if (count !== 10) throw new Error(`❌ Expected 10 posts but found ${count}`);

    I.seeNumberOfElements(this.selectors.postItems, 10);
  },

  async notVisibleMobile() {
    await this.handleCookieIfDisplayed();
    const visible = await I.grabNumberOfVisibleElements(this.selectors.root).catch(() => 0);
    if (visible > 0) throw new Error("❌ Section is visible on mobile but should not be.");
    console.log("✅ Section correctly hidden on mobile");
  },

  confirmURLHasAnchor() {
    I.waitInUrl("#most-read-container", 10);
  }
};
