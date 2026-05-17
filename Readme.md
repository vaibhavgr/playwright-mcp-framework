# 🎭 Playwright Automation Framework for AutomationExercise

<div align="center">
  <img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
</div>

<br/>

A robust, scalable, and highly maintainable end-to-end (E2E) automation testing framework built using **Playwright** and **TypeScript**. This project automates the flows on [Automation Exercise](https://automationexercise.com/) website using industry best practices.

## 🚀 Key Features

- **Page Object Model (POM):** Clean separation of test logic and page interactions for high maintainability.
- **Custom Fixtures:** Eliminates repetitive setup and teardown code.
- **Data-Driven Approach:** Dynamic and random test data generation (Users, Credit Cards, etc.).
- **E2E Workflows:** Covers complex scenarios like Registration, Cart Management, Checkout, Invoice Download, and Account Deletion.
- **API Testing:** Built-in utilities for interacting with backend endpoints.
- **AI-Agent Experimentation:** Experimental features integrated for modern agentic capabilities.

---

## 📁 Project Structure

```text
├── config/              # Environment configs (e.g., .env.dev)
├── data/                # Test data and data generators (userData, paymentData)
├── pageObjects/         # POM classes (HomePage, CartPage, CheckoutPage, etc.)
├── tests/               # Playwright test specs categorized by feature
│   ├── auth/            # Login, Signup, Account workflows
│   ├── cart/            # Cart manipulation tests
│   ├── checkout/        # E2E checkout workflows
│   ├── product/         # Product listing and search tests
│   └── fixtures/        # Custom Playwright fixtures (baseTest)
├── utils/               # Helper utilities (APIUtils, UniqueGenerator, etc.)
└── playwright.config.ts # Global Playwright configurations
```

---

## ⚙️ Prerequisites

Ensure you have the following installed on your machine:
- **[Node.js](https://nodejs.org/en/)** (v16 or higher)
- **[Git](https://git-scm.com/)**
- A code editor like **[VS Code](https://code.visualstudio.com/)**

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
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

---

## 🏃‍♂️ Running the Tests

**Run all tests (Headed mode):**
```bash
npx playwright test --headed
```

**Run all tests (Headless mode):**
```bash
npx playwright test
```

**Run a specific test case (e.g., Checkout flow):**
```bash
npx playwright test tests/checkout/checkout.spec.ts
```

**Run tests in the UI Mode (Highly recommended for debugging):**
```bash
npx playwright test --ui
```

**View Test Report:**
```bash
npx playwright show-report
```

---

## 🧑‍💻 Author

**Vaibhav Grover**
- **GitHub:** [@vaibhavgr](https://github.com/vaibhavgr)

*Feel free to star ⭐ this repository if you find it helpful!*