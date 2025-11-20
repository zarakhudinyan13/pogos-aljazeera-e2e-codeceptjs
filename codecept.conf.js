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
      restart: true,   // required for CI stability
      windowSize: "1920x1080",

      desiredCapabilities: {
        browserName: "chrome",
        'goog:chromeOptions': {
          args: [
            '--headless=new',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--disable-infobars',
            '--allow-insecure-localhost',
            '--disable-features=VizDisplayCompositor,IsolateOrigins,site-per-process,PrivacySandboxAdsAPIs',
            '--disable-popup-blocking',
            '--disable-extensions',
            '--disable-blink-features=AutomationControlled',
            '--remote-debugging-port=9222'
          ]
        }
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

  multiple: {
    parallel: {
      // Works locally in parallel, runs 1 chunk in CI for stability
      chunks: process.env.CI ? 1 : 2,
      browsers: ["chrome"]
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
