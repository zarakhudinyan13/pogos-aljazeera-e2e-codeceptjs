# 🧪 Al Jazeera UI E2E Automation Suite  
Automated UI regression tests using **CodeceptJS**, **Page Object Model (POM)** and **BDD (Gherkin)**.  
This suite verifies key user-facing functionality on **aljazeera.com** including:

- 📰 **Most Read / Trending Articles Section**
- 📺 **Live Stream Player**
- ♿ **Accessibility Keyboard Navigation**
- 📱 **Responsive desktop vs mobile behavior**

---

## 🚀 Tech Stack

| Component | Details |
|----------|---------|
| Framework | CodeceptJS |
| Syntax | BDD (Gherkin) |
| Pattern | Page Object Model (POM) |
| Runner | WebDriverIO |
| CI/CD | GitHub Actions |
| Execution Mode | Parallel + Cross-viewport (Desktop + Mobile) |

---

## 📁 Project Structure

repo
┣ 📂 features # BDD test scenarios (.feature)
┣ 📂 step_definitions # Step → POM mapping
┣ 📂 pages # Page Object Model files
┣ 📂 output # Logs, screenshots, failures
┣ 📜 codecept.conf.js # Test runner configuration
┗ 📜 package.json # Scripts & dependencies





## ▶️ Running Tests Locally

# 1. Clone repo
git clone https://github.com/zarakhudinyan13/pogos-aljazeera-e2e-codeceptjs.git
cd pogos-aljazeera-e2e-codeceptjs

# 2. Install dependencies
npm install

# 3. Install Selenium + ChromeDriver
npm run selenium:install

# 4. Start Selenium (in a separate terminal)
npm run selenium:start

# 5. Run tests locally in headed mode
npm run test:all

# (Optional)
npm run test:ci  # runs in headless CI mode


---

## 🧪 Available NPM Scripts

| Command | Action |
|--------|--------|
| `npm run test:all` | Runs all tests in parallel mode |
| `npm run test:most-read` | Runs only the "Most Popular" suite |
| `npm run test:live` | Runs only live stream scenarios |
| `npm run report` | Generates report if Allure is enabled |

---

## 🔁 Continuous Integration (CI)

This project runs automatically on:

- Every push to `main/master`
- Manual dispatch
- **Weekly scheduled run every Monday**

Status:  
![E2E Tests](https://github.com/zarakhudinyan13/pogos-aljazeera-e2e-codeceptjs/actions/workflows/e2e.yml/badge.svg)


## 📸 CI Artifacts

Failing runs upload:

- Screenshots  
- Logs  
- Console errors  

Stored in GitHub Actions → Run Artifacts.

---

## 🧱 Parallel Execution

Tests execute using CodeceptJS **run-multiple** configuration which improves speed and supports multi-viewport checks.

---

## 🧩 Extensibility

This suite is built to scale:

✔ Add more pages easily with `/pages/ComponentName.page.js`  
✔ Add new `.feature` files without editing framework code  
✔ Supports optional Allure reports (disabled by default)

---

## 🤝 Contribution

1. Create feature
2. Add POM methods
3. Commit & push
4. CI runs automatically with artifacts stored

---

## 📜 License

MIT License — free to modify and extend.

---

## 👤 Author

Maintained by **Zara Khudinyan**  
Sr QA Engineer | Automation Specialist


