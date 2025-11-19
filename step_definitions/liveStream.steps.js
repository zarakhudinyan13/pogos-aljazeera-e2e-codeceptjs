const { LivePage } = inject();

Given("I am on the Al Jazeera live page on desktop", () => {
  LivePage.openLiveDesktop();
});

Then("the livestream player should be visible", () => {
  LivePage.seePlayerVisible();
});

Then("the Switch Player button should be visible", () => {
  LivePage.seeSwitchButtonVisible();
});
