const { I, homePage, mostPopularComponent } = inject();

//
// --- STEP DEFINITIONS ---
//

// ---------- GIVEN ----------
Given('I am on the Al Jazeera home page on desktop', async () => {
  await homePage.openDesktop();
  await homePage.acceptCookies();
});

Given('I am on the Al Jazeera home page on mobile', async () => {
  await homePage.openMobile();
  await homePage.acceptCookies();
});

// ---------- WHEN ----------
When('I look for the Most Popular section', async () => {
  await mostPopularComponent.scrollToSection();
});

// Keyboard navigation for skip link
When('I use the keyboard to reach the skip link', () => {
  // 3 Tabs consistently lands on the skip accessibility menu
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
});

When('I activate the skip link', () => {
  I.pressKey('Enter');
});

// ---------- THEN ----------
Then('the Most Popular section should be visible', () => {
  mostPopularComponent.confirmVisible();
});

Then('the Most Popular section should contain 10 posts', async () => {
  await mostPopularComponent.validatePostsCount();
});

Then('the Most Popular section should not appear on mobile', async () => {
  await mostPopularComponent.confirmHiddenOnMobile();
});

// Final expected accessibility behaviour
Then('focus should move to the Most Read section', () => {
  I.waitForElement('#most-read-container', 10);
  I.seeElement('#most-read-container');
});
