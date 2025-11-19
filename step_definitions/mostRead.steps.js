const { I } = inject();
const MostPopularComponent = require("../pages/components/mostPopular.component");
const HomePage = require("../pages/home.page");

Given("I am on the Al Jazeera home page on desktop", async () => {
  await HomePage.openDesktop();
  await MostPopularComponent.handleCookieIfDisplayed();
});

Given("I am on the Al Jazeera home page on mobile", async () => {
  await HomePage.openMobile();
  await MostPopularComponent.handleCookieIfDisplayed();
});

When("I look for the Most Popular section", async () => {
  await MostPopularComponent.scrollUntilVisible();
});

Then("the Most Popular section should be visible", async () => {
  await MostPopularComponent.seeVisibleDesktop();
});

Then("the Most Popular section should contain 10 posts", async () => {
  await MostPopularComponent.seeExactlyTenPosts();
});

Then("the Most Popular section should not be visible on mobile", async () => {
  await MostPopularComponent.notVisibleMobile();
});

When("I open the bypass blocks menu", async () => {
  I.pressKey("Tab");
  I.pressKey("Tab");
  I.pressKey("Tab");
});

When('I choose the "Skip to Most Read" option', async () => {
  I.pressKey("Enter");
});

Then("the URL should include the Most Read anchor", async () => {
  await MostPopularComponent.confirmURLHasAnchor();
});
