const { setHeadlessWhen } = require('@codeceptjs/configure');

// Fix for crypto undefined when running parallel mode in CI
if (typeof global.crypto === "undefined") {
  global.crypto = require("crypto");
}

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
            '--disable-site-isolation-trials',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process,PrivacySandboxAdsAPIs',
            '--no-sandbox',
            '--disable-gpu',
            '--allow-insecure-localhost',
            '--disable-infobars',
            '--disable-blink-features=AutomationControlled'
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

  // Parallel execution config
  multiple: {
    parallel: {
      chunks: 2, // Run in 2 workers (you can set 3 or 4)
      browsers: ["chrome"],
    }
  },

  plugins: {
    retryFailedStep: { enabled: true },
    screenshotOnFail: { enabled: true },
    pauseOnFail: {},
    allure: { enabled: false },
    autoDelay: { enabled: true, delayBefore: 200, delayAfter: 200 },
  },
};
