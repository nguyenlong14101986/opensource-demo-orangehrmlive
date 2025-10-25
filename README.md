# 🧪 OrangeHRM Open Source Automation Framework (Playwright + TypeScript)

A modular, data-driven, and CI/CD-ready automation framework built with **Playwright** and **TypeScript** for testing [opensource-demo.orangehrmlive.com](https://opensource-demo.orangehrmlive.com).

---

## 📁 Project Structure

```
.
├── .github/
│   ├── actions/
│   │   ├── setup-playwright/
│   │   │   └── action.yml                # composite action: checkout, cache, setup-node, install deps, install browsers
│   │   └── upload-reports/
│   │       └── action.yml                # composite action: generate Allure & upload artifacts
│   └── workflows/
│       └── playwright.yml                # CI workflow (manual dispatch + PR)
│
├── env/
│   ├── .env.dev                          # env values for dev
│   └── .env.qa                           # env values for qa
│
├── hook/
│   └── BeforeTest.ts                     # global test hooks (login beforeEach etc.)
│
├── lib/
│   ├── BaseTest.ts                       # base test fixture definitions
│   └── WebUI.ts                          # generic UI helpers (dropdowns, etc.)
│
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── AdminPage.ts
│
├── resources/
│   ├── login-data.json                   # data-driven test records for login
│   └── admin-data.json                   # data-driven test records for admin/search
│
├── tests/
│   ├── Login.test.ts
│   └── Admin.test.ts
│
├── utils/
│   ├── CryptoHelper.ts                   # AES encrypt/decrypt
│   ├── DataLoader.ts                     # test data loader by tag/testcaseId
│   └── EnvManager.ts                     # loads `.env.*` and decrypts values
│
├── allure-results/                       # Allure raw results (generated at runtime)
├── allure-report/                        # Generated Allure html report (CI artifact)
├── playwright-report/                    # Playwright HTML report (generated at runtime)
|
├── global-setup.ts                       # global setup (e.g., cleanup)
├── playwright.config.ts                  # Playwright configuration (projects, reporters, timeouts)
├── tsconfig.json                         # TypeScript compiler options & path aliases
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Framework Design & Rationale

### 🔹 Test Layer (`tests/`)
- Each test suite (e.g., `Login.test.ts`, `Admin.test.ts`) extends from `@lib/BaseTest`, which injects fixtures for pages and data (`{ loginPage, dashboardPage, adminPage, testData, env }`).
- Tests are **data-driven** and **tag-based**, meaning each test automatically fetches data from corresponding JSON files in `/resources`.
- Each test uses **annotations** (like `testcaseId`) to map to data and reporting metadata.

---

### 🔹 Utilities Layer (`utils/`)

| File | Responsibility |
|------|----------------|
| **CryptoHelper.ts** | Encrypts/decrypts sensitive data like passwords using AES. |
| **DataLoader.ts** | Loads JSON test data based on tag and testcaseId. |
| **EnvManager.ts** | Loads environment-specific `.env` files and decrypts credentials. |

---

### 🔹 Configuration Layer
- **playwright.config.ts**: Defines reporters, timeouts, browsers, retries, and screenshot/trace policies.
- **tsconfig.json**: Provides path aliases for cleaner imports (`@pages`, `@lib`, `@utils`, etc.).
- **global-setup.ts**: Deletes Allure results before each test run to ensure clean reporting.

---

## 🚀 Setup & Installation

### 1️⃣ Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Git](https://git-scm.com/)
- [Allure Commandline](https://docs.qameta.io/allure/#_installing_a_commandline) (optional for report viewing)

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment
Add your environment files under `/env` folder, for example:

**.env.dev**
```
BASE_URL=https://opensource-demo.orangehrmlive.com
LOGIN_USER=admin
LOGIN_PASS=U2FsdGVkX1+encryptedpassword==
```
Use `CryptoHelper.encrypt("your_password")` to generate an encrypted password string.

---

## 🧪 Run Tests

### ▶️ Run all tests
```bash
npm test
```

### ▶️ Run specific test file
```bash
npx playwright test tests/Login.test.ts
```

### ▶️ Run tests by tag
```bash
npx playwright test --grep @admin
npx playwright test --grep @smoke
```

### ▶️ Run with Allure & HTML reports
```bash
npm test
allure serve allure-results
```

Reports are automatically generated under:
- **`playwright-report/`** (HTML)
- **`allure-results/`** (Allure raw data)

---

## ☁️ CI/CD (GitHub Actions)

This repository supports automated test runs via **GitHub Actions**.

### 🔹 Workflows:
- **Manual trigger:** Run tests on demand from the Actions tab.  
- **Push trigger:** Runs when changes are merged into `main`.  
- **Pull request trigger:** Runs automatically on open/update of a PR.

You can manually trigger a test run:
1. Go to **Actions → Run Test - Manual**
2. Click **Run workflow**
3. Select env, browser and confirm

---

## 🔐 Data & Environment Management

### Environment loading:
`EnvManager.ts` automatically detects the active `.env` file based on `ENV` variable.

Example:
```bash
set ENV=dev
npm test
```

---

## 📊 Reporting

- **HTML Report:** `playwright-report/index.html`
- **Allure Report:** Launch via `allure serve allure-results`

Each test includes:
- Tags (e.g., `@smoke`, `@negative`, `@edge`)
- Testcase ID annotations
- Screenshots, trace, and video on failure

---

## 🧱 Example Test Suites

### 🔹 `Login.test.ts`
Validates authentication scenarios:
- Successful login
- Mixed-case username handling
- Invalid password
- Empty fields
- Max input length validation

### 🔹 `Admin.test.ts`
Covers admin search functionality:
- Valid username / role / status searches
- Case-insensitive match
- Combined filters
- Invalid characters
- Large input edge cases

---

## 🧰 NPM Scripts

| Command | Description |
|----------|--------------|
| `npm test` | Runs Playwright tests with Allure & HTML reporters |
| `npx playwright test --grep @smoke` | Run tests by tag |
| `npx playwright show-report` | Open latest HTML report |
| `allure serve allure-results` | Serve Allure report locally |

---

## 📘 Summary

This project demonstrates a **scalable**, **secure**, and **CI-ready** automation framework featuring:
- ✅ Playwright + TypeScript + Allure
- ✅ Data-driven & environment-aware tests
- ✅ GitHub Actions integration
- ✅ Secure credential handling
- ✅ Parallel & cross-browser execution

---

### 👨‍💻 Author
**Nguyen Long**
- 🔗 [GitHub Repository](https://github.com/nguyenlong14101986/opensource-demo-orangehrmlive)
