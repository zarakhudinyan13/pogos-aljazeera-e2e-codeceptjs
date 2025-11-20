const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "./features/*.feature",
  output: "./output",

  helpers: {
    WebDriver: {
      url: "https://www.aljazeera.com",
      browser: "chrome",
      smartWait: 8000,
      waitForTimeout: 20000,
      restart: false,
      windowSize: "maximize",

      desiredCapabilities: {
        browserName: "chrome",
        'goog:chromeOptions': {
          args: [
            '--disable-web-security',
            '--disable-site-isolation-trials',
            '--disable-features=IsolateOrigins,site-per-process,PrivacySandboxAdsAPIs',
            '--no-sandbox',
            '--disable-gpu',
            '--allow-insecure-localhost',
            '--disable-infobars',
            '--disable-blink-features=AutomationControlled',
            '--headless=new'
          ],
        },
      },

      timeouts: {
        pageLoad: 60000,
        implicit: 5000,
      },
    },
  },

  include: {
    I: "./steps_file.js",
    homePage: "./pages/home.page.js",
    mostPopularComponent: "./pages/components/mostPopular.component.js",
    livePage: "./pages/live.page.js",
  },

  gherkin: {
    features: "./features/*.feature",
    steps: [
      "./step_definitions/mostRead.steps.js",
      "./step_definitions/liveStream.steps.js",
    ],
  },

  multiple: process.env.CI
    ? {} // disable parallel in CI to avoid crypto & webdriver errors
    : {
        parallel: {
          chunks: 2,
          browsers: ["chrome"],
        },
      },

  plugins: {
    retryFailedStep: { enabled: true },
    screenshotOnFail: { enabled: true },
    pauseOnFail: {},
    allure: { enabled: false },
    autoDelay: { enabled: true, delayBefore: 200, delayAfter: 200 },
  },
};
