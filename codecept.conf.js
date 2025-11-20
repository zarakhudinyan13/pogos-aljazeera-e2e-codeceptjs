const { setHeadlessWhen } = require('@codeceptjs/configure');

// Detect CI and Local Run
const isCI = process.env.CI === 'true';
const isHeadless = isCI || process.env.HEADLESS === 'true';

// Apply headless only when CI or user requests it
setHeadlessWhen(isHeadless);

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
      windowSize: isCI ? "1920x1080" : "maximize",

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
            ...(isHeadless ? ['--headless=new'] : [])
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

  // Parallel ONLY locally to keep CI stable
  multiple: isCI
    ? {}
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
