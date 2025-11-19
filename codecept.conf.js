const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "./tests/*.js",
  output: "./output",

  helpers: {
    WebDriver: {
      url: process.env.BASE_URL || "https://www.aljazeera.com",
      browser: "chrome",
      smartWait: 5000,
      waitForTimeout: 10000,
      timeouts: {
        script: 60000,
        "page load": 30000,
      },
      desiredCapabilities: {
        'goog:chromeOptions': {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--window-size=1440,900'
          ]
        }
      }
    }
  },

  include: {
    I: "./support/steps_file.js",
    HomePage: "./pages/home.page.js",
    LivePage: "./pages/live.page.js",
    MostPopularComponent: "./pages/components/mostPopular.component.js",
  },

  gherkin: {
    features: "./features/**/*.feature",
    steps: [
      "./step_definitions/mostRead.steps.js",
      "./step_definitions/liveStream.steps.js"
    ]
  },

  plugins: {
    screenshotOnFail: { enabled: true },
    retryFailedStep: { enabled: true, retries: 1 },
    allure: {
      enabled: true,
      require: "@codeceptjs/allure-legacy",
      outputDir: "output/allure-results",
    }
  },

  name: "pogos-aljazeera-e2e-codeceptjs",
};
