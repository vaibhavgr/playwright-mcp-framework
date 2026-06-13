# 🎭 Playwright Automation Framework with Real-Time Grafana & Loki Monitoring

<div align="center">
  <img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" />
</div>

<br/>

A robust, scalable, and highly maintainable end-to-end (E2E) UI and API automation testing framework built using **Playwright** and **TypeScript**, integrated with an enterprise-grade **Grafana & Loki monitoring pipeline** for real-time log ingestion and test analysis.

---

## 🚀 Key Features

- **Page Object Model (POM):** Clean separation of test scenarios and UI interactions for maximum readability and maintainability.
- **Custom Fixtures:** Overrides Playwright's default fixtures to block Google ads globally and share initialized page objects automatically.
- **Data-Driven Testing:** Dynamic test data generation using `@faker-js/faker` for registrations, payments, and checkout flows.
- **Zero-Dependency Structured Logger:** Custom TS logger that writes line-delimited JSON (NDJSON) logs to files (optimized for Loki) and clean color-coded status logs to the local console.
- **Automated Lifecycle Hooks:** Integrates hooks (`beforeEach`/`afterEach`) to automatically capture test start, completion duration, passed/failed statuses, and failure stack traces.
- **API Testing Suite:** Re-usable API utilities (`get`, `postCall`, `put`, `postForm`) with automated HTTP request/response logging.
- **Multi-Container Monitoring Stack:** Pre-configured Docker Compose workspace that spins up Loki, Promtail, and Grafana instantly.

---

## 📊 Logging & Monitoring Architecture (Grafana + Loki + Promtail)

The framework features a real-time observability pipeline that automatically streams E2E execution logs from the test runner to a centralized Grafana dashboard:

```text
[ Playwright Run ] ➔ [ logs/execution-YYYY-MM-DD.log ] ➔ [ Promtail Container ] ➔ [ Loki DB Container ] ➔ [ Grafana UI (Port 3000) ]
```

### 1. Zero-Configuration Local Execution
Loki and Promtail are automatically connected inside Docker. Promtail tracks the dynamically generated date-based log files (`logs/execution-*.log`) and ships them instantly.

### 2. Live Log Querying (LogQL)
In Grafana's **Explore** tab, you can search, filter, and alert on test logs using simple LogQL queries:
```logql
{job="playwright-e2e"} | json
```
This automatically parses log entry properties (`level`, `message`, `test`, `timestamp`, `error`) as metadata fields in Grafana, enabling you to filter by failed tests or error stack traces dynamically.

---

## 📁 Project Structure

```text
├── config/                  # Configuration files
│   ├── env/                 # Environment configs (.env.dev, etc.)
│   ├── envLoader.ts         # Utility to load config dynamically
│   └── grafana/             # Loki, Promtail & Docker Compose setup files
├── data/                    # Dynamic test data generators
├── pageObjects/             # POM classes containing web elements and actions
├── tests/                   # Playwright spec files
│   ├── api/                 # API endpoint spec files
│   ├── auth/                # Login, registration, and user auth tests
│   ├── fixtures/            # Playwright setup files (baseTest with lifecycle hooks)
│   └── ...                  # Other E2E workflow spec files
├── utils/                   # Shared helpers (Logger.ts, APIUtils.ts, etc.)
├── logs/                    # Dynamically generated execution log files [Git Ignored]
├── playwright.config.ts     # Global Playwright configurations
├── tsconfig.json            # TypeScript configuration with path mappings
└── package.json             # NPM dependencies and scripts
```

---

## ⚙️ Prerequisites

Ensure you have the following installed locally:
- **[Node.js](https://nodejs.org/en/)** (v18 or higher)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (for Grafana logs monitoring)
- **[Git](https://git-scm.com/)**

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vaibhavgr/playwright-mcp-framework.git
   cd playwright-mcp-framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npx playwright install --with-deps
   ```

---

## 🏃‍♂️ Running the Tests & Monitoring Stack

### 1. Spin up the Grafana & Loki Stack
Start Docker Desktop, then run the compose command from the root directory:
```bash
docker compose -f config/grafana/docker-compose.yml up -d
```
* Access the Grafana Dashboard at **[http://localhost:3000](http://localhost:3000)** (Default Login: `admin` / `admin`).
* Add **Loki** as a Data Source with the connection URL: `http://loki:3100`.

### 2. Run Playwright Tests
Execute UI or API specs locally:
```bash
# Run all tests
npx playwright test

# Run a specific spec file (e.g. API tests)
npx playwright test tests/api/product.spec.ts

# Run tests in UI Mode (Interactive debugging)
npx playwright test --ui
```

### 3. Generate HTML & Allure Reports
The framework outputs detailed Allure reports to visualize test history, flakiness, and step breakdowns:
```bash
# Generate report from test results
npm run allure:generate

# Open the report server locally
npm run allure:open
```
* Access Allure Dashboard at **[http://localhost:8080](http://localhost:8080)**.

---

## 🧑‍💻 Author

**Vaibhav Grover**
- **GitHub:** [@vaibhavgr](https://github.com/vaibhavgr)

---
*Feel free to star ⭐ this repository if you find it helpful!*