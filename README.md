# 💎 ZENVY
### *Next-Gen AI-Powered Payroll Management*

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)](https://mongodb.com)
[![Build](https://img.shields.io/badge/Build-Production--Ready-blue?style=for-the-badge)](https://render.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

**ZENVY** is a high-performance, full‑stack Payroll Management System. Designed for the modern enterprise, it leverages a **Multi-Tenant Architecture** to serve multiple companies within a single deployment, ensuring total data isolation and AI-driven workforce insights.

---

## 🌟 Key Highlights
* 🛡️ **Enterprise Security:** JWT-based sessions with Bcrypt encryption.
* 🏢 **Multi-Tenancy:** Strict data scoping by `companyId`.
* 🤖 **AI Insights:** Automated leave probability forecasting.
* 📊 **Role-Based Dashboards:** Custom views for Admins, HR, and Employees.

---

## 🏗️ System Architecture
The system is built for scalability, separating the concern of UI, Logic, and Intelligence.



| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | `React.js` | Dynamic UI & State Management |
| **Backend** | `Node.js` / `Express` | API Orchestration & Business Logic |
| **Database** | `MongoDB` | Document-based Scalable Storage |
| **Intelligence** | `AI Module` | Predictive Analytics Engine |
| **Security** | `JWT` | Stateless Authentication |

---

## 🗄️ Database Design
The schema is optimized for relational consistency within a NoSQL environment.



<details>
<summary>📂 <b>View Detailed Collections (Tables)</b></summary>

### 1. Companies & Users
* **Companies:** Stores `name`, `taxId`, and registration metadata.
* **Users:** Handles credentials with **Role-Based Access Control (RBAC)**: `ADMIN`, `HR`, or `EMPLOYEE`.

### 2. Attendance & Salary
* **Attendance:** Monthly tracking of `daysPresent` linked to a specific company/user.
* **Salary Components:** Granular breakdown of `baseSalary`, `HRA`, `Bonuses`, and `Deductions`.

### 3. Payroll (The AI Engine)
* **Final Output:** Stores `netSalary` and the **AI Prediction** string.
</details>

---

## 🧠 AI & Calculation Logic

### 📈 The Formula
ZENVY automates the payroll run using a standardized industrial formula:

$$Gross\ Salary = Base\ Salary + HRA + Bonus$$
$$Net\ Salary = \left(\frac{Gross\ Salary}{30} \times Days\ Present\right) - Deductions$$

### 🔮 AI Leave Prediction
Our utility module analyzes attendance patterns to flag potential workforce gaps:
> [!TIP]
> **Logic:** If an employee's presence falls below **20 days**, the AI flags a **"High Probability"** for leave in the following cycle, allowing HR to plan resources proactively.

---

## 🛠️ API Reference (REST)

| Method | Endpoint | Role | Purpose |
| :--- | :---: | :---: | :--- |
| `POST` | `/auth/login` | 🔓 All | Secure Session Initiation |
| `POST` | `/employees` | 👤 HR | Onboard New Talent |
| `POST` | `/attendance` | 📅 HR | Batch Update Presence |
| `POST` | `/payroll/run` | ⚙️ HR | Trigger AI & Calculation Engine |
| `GET` | `/payroll/me` | 📄 EMP | Access Personal Payslips |

---

## 🔒 Security & Deployment

* **Data Integrity:** All queries are filtered through a `tenantHandler` middleware to ensure no company can ever access another company's records.
* **Infrastructure:**
    * **Frontend:** Hosted on **Netlify** (Global CDN).
    * **Backend:** Managed on **Render** (Auto-scaling).
    * **Database:** **MongoDB Atlas** (Cloud Clusters).

---

## 💻 Installation & Setup

### 1. Clone & Install
```bash
git clone [https://github.com/username/zenvy.git](https://github.com/username/zenvy.git)
cd zenvy && npm run install-all
