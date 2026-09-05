# AutomationExercise Playwright AI

A scalable UI automation framework for the [AutomationExercise](https://automationexercise.com/) application, built using Playwright and TypeScript.

The project follows industry-standard automation practices such as Page Object Model (POM), reusable fixtures, test-data separation, cross-browser execution, failure diagnostics, reporting, CI/CD, and a custom AI-agent workflow for automation planning, generation, and review.

---

## Project Overview

This project demonstrates an end-to-end Playwright automation framework for testing key eCommerce workflows of the AutomationExercise application.

The framework is designed with maintainability, reusability, reliability, and CI/CD execution in mind.

### Key Areas Covered

- Authentication
- Product search and navigation
- Product details
- Cart management
- Checkout
- Payment
- Contact Us
- Subscription
- Product reviews
- Category and brand navigation
- Cross-browser testing

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | UI automation |
| TypeScript | Programming language |
| Playwright Test | Test runner and assertions |
| Node.js | Runtime environment |
| npm | Dependency management |
| Page Object Model | Framework design pattern |
| JSON | Test-data management |
| dotenv | Environment configuration |
| Allure | Test reporting |
| GitHub Actions | CI/CD |
| Git | Version control |
| GitHub | Source code repository |

---

## Framework Architecture

The framework follows a layered architecture:

```text
AutomationExercise_Playwright_AI
│
├── .github/
│   ├── agents/
│   │   ├── planner.agent.md
│   │   ├── application-explorer.agent.md
│   │   ├── framework-generator.agent.md
│   │   ├── test-generator.agent.md
│   │   └── healer-reviewer.agent.md
│   │
│   └── workflows/
│       └── playwright.yml
│
├── auth/
│
├── config/
│   └── environment.ts
│
├── fixtures/
│   └── fixture.ts
│
├── pages/
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── header.ts
│   ├── footer.ts
│   ├── login.page.ts
│   ├── signup.page.ts
│   ├── products.page.ts
│   ├── product-card.ts
│   ├── product-details.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── payment.page.ts
│   └── contact-us.page.ts
│
├── tests/
│   ├── test-data/
│   └── ui/
│
├── utils/
│   ├── common-utils.ts
│   └── logger.ts
│
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md