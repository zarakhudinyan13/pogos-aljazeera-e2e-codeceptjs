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

  plugins: {
    retryFailedStep: { enabled: true },
    screenshotOnFail: { enabled: true },
    pauseOnFail: {},
    allure: { enabled: false },
    autoDelay: { enabled: true, delayBefore: 200, delayAfter: 200 }
  },

  /** 🏎️ Parallel run support */
  multiple: {
    parallel: {
      browsers: ["chrome"], // can add Firefox later
      chunks: 2, // increase to 3 if your machine can handle it
    }
  },
};
