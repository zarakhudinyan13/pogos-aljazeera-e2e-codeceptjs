const { I } = inject();
const livePage = require('../pages/live.page.js');

Given("I am on the Al Jazeera live page on desktop", () => {
  livePage.openLiveDesktop();
});

Then("the livestream player should be visible", () => {
  livePage.seePlayerVisible();
});

Then("the Switch Player button should be visible", () => {
  livePage.seeSwitchButtonVisible();
});
