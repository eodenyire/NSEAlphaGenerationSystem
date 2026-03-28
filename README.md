# NSEAlphaGeneration V5

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1.0-green?logo=supabase)](https://supabase.com/)

**NSE Alpha Generation System** is a web platform delivering real-time trading signals, macroeconomic events, and market sentiment insights. It is designed for investors, clients, and third-party stakeholders in Kenya and beyond, providing actionable financial intelligence on the Nairobi Securities Exchange (NSE).

---

## Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [System Architecture](#system-architecture)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Database Schema](#database-schema)
* [API Endpoints](#api-endpoints)
* [SMS & Email Alerts](#sms--email-alerts)
* [Role-Based Access](#role-based-access)
* [Screenshots](#screenshots)
* [Contributing](#contributing)
* [Roadmap](#roadmap)
* [FAQ](#faq)
* [License](#license)

---

## About

Economic Signal Forge combines real-time trading intelligence, market sentiment, macroeconomic insights, and portfolio risk metrics to give investors a competitive edge. Admins can manage users, push signals, and trigger automated alerts via SMS or email.

---

## Features

### Investor-Facing

* **Real-Time Dashboard:** Buy/Hold/Sell signals, portfolio performance vs NSE 20-share index
* **Sentiment Analysis:** Aggregated market sentiment from multiple sources
* **Macro Events Monitoring:** Geopolitical, fiscal, and economic events affecting investments
* **Portfolio Risk Metrics:** Sharpe ratio, Sortino ratio, Max Drawdown, VaR, Beta, Alpha

### Admin Panel

* **User Management:** Assign roles (Admin, Client, Investor, Third-Party), manage subscriptions
* **Signal Management:** Create, update, and push trading signals with targets and stop-loss
* **Alerts:** Automated or manual SMS/email notifications for active subscribers
* **Activity Logs:** Track user activity and signal history

### Third-Party

* **Regulator Access:** View-only or data-contribution privileges for CBK, KNBS, NSE
* **Data Integration:** Future support for live data uploads and feeds

---

## Tech Stack

| Layer              | Technology                                             |
| ------------------ | ------------------------------------------------------ |
| Frontend           | React 18, TypeScript, Vite, TailwindCSS                |
| Backend            | Supabase / Lovable Cloud (Edge Functions, Auth, RLS)   |
| Database           | PostgreSQL                                             |
| Auth               | Supabase Auth, OAuth (Google, Apple, GitHub, Facebook) |
| Alerts             | Twilio (SMS), Email via custom domain                  |
| Testing            | Vitest, Playwright                                     |
| ML Models (Future) | Random Forest, XGBoost, LSTM, GRU                      |

---

## System Architecture

```
┌───────────────┐
│   Frontend    │ React + Tailwind + Vite
└───────┬───────┘
        │
        ▼
┌───────────────┐
│   Backend     │ Supabase / Lovable Cloud
│ - Auth        │
│ - Edge Funcs  │
│ - RLS         │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  Database     │ PostgreSQL
│ - Users       │
│ - Roles       │
│ - Signals     │
│ - Events      │
│ - Sentiment   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Alerts Engine │ Twilio SMS / Email
└───────────────┘
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/eodenyire/economic-signal-forge.git

# Navigate into project
cd economic-signal-forge

# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

---

## Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Configure:

```env
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
TWILIO_PHONE_NUMBER=<your-twilio-from-number>
EMAIL_DOMAIN=<your-email-domain>
```

3. Enable OAuth for Google, Apple, Facebook, and GitHub via Supabase.

---

## Usage

* **Signup/Login:** Investors, Clients, Admins, Third-Party roles supported
* **Dashboard:** View trading signals, portfolio, sentiment, and macro events
* **Admin Panel:** Manage users, push signals, send alerts
* **Manual Alerts:** Admins can manually send SMS/Email alerts

---

## Database Schema

| Table               | Key Columns                                                              | Description                 |
| ------------------- | ------------------------------------------------------------------------ | --------------------------- |
| profiles            | id, full_name, email, phone, created_at                                  | User profiles               |
| user_roles          | id, user_id, role                                                        | Role assignments            |
| subscriptions       | id, user_id, plan, status                                                | Active subscription records |
| trading_signals     | id, stock, signal_type, price, target, stop_loss, confidence, created_at | Live BUY/HOLD/SELL signals  |
| macro_events        | id, title, category, impact, date                                        | Political/economic events   |
| sentiment_data      | id, source, stock, sentiment_score, created_at                           | Market sentiment            |
| portfolio_snapshots | id, user_id, date, value, risk_metrics                                   | Portfolio daily snapshots   |

RLS policies ensure data security based on user roles.

---

## API Endpoints

| Endpoint            | Method | Description                   |
| ------------------- | ------ | ----------------------------- |
| `/api/auth/signup`  | POST   | Register new users            |
| `/api/auth/login`   | POST   | Login users                   |
| `/api/signals`      | GET    | Fetch latest trading signals  |
| `/api/signals`      | POST   | Admin creates new signal      |
| `/api/alerts/sms`   | POST   | Send SMS alerts               |
| `/api/alerts/email` | POST   | Send Email alerts             |
| `/api/portfolio`    | GET    | Fetch user portfolio snapshot |

---

## SMS & Email Alerts

* **SMS Alerts:** Twilio integration, automated on signal push
* **Email Alerts:** Custom domain; fully branded emails with signal details
* **Manual Trigger:** Admin panel allows one-click push to subscribers

---

## Role-Based Access

| Role        | Permissions                                      |
| ----------- | ------------------------------------------------ |
| Admin       | Full access: Users, Signals, Alerts, Dashboard   |
| Client      | View own portfolio and signals                   |
| Investor    | Dashboard view: Signals, Sentiment, Macro Events |
| Third-Party | Limited access: Read-only, future data uploads   |

---

## Screenshots

### Dashboard

![Dashboard Placeholder](./docs/screenshots/dashboard.png)

### Admin Panel

![Admin Panel Placeholder](./docs/screenshots/admin_panel.png)

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push branch (`git push origin feature/my-feature`)
5. Create a Pull Request

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Roadmap

* Live ML-powered trading signal predictions (RF, XGBoost, LSTM, GRU)
* Dedicated third-party portal (CBK, KNBS, NSE)
* Automated NSE OHLC data pipeline
* Enhanced alerting system with rich HTML emails
* Mobile app for investors

---

## FAQ

**Q: Can users see each other’s portfolios?**
A: No, portfolio data is restricted by RLS policies; only admins can see all data.

**Q: How are alerts triggered?**
A: Automatically when a signal is pushed by admin; manual trigger is also available.

**Q: Is this platform limited to Kenya?**
A: Currently optimized for the NSE, but can be extended to other exchanges.

---

## License

MIT License © 2026 [Emmanuel Odenyire](https://github.com/eodenyire)

---

