# ZENVY – AI Powered Payroll System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Build](https://img.shields.io/badge/Build-Production--Ready-blue)

**ZENVY** is a full‑stack, AI‑assisted Payroll Management System. It supports multi‑company (multi‑tenant) architecture with strict data isolation, role‑based access control, and automated salary computation.

---

## 🏗️ System Architecture

| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React, Axios | UI rendering, user interaction, API consumption |
| **Backend** | Node.js, Express | Business logic, payroll calculation, security |
| **Database** | MongoDB | Persistent data storage |
| **AI Service** | Utility Module | Predictive insights (Leave probability) |
| **Auth Layer** | JWT, bcrypt | Secure authentication & authorization |

---

## 🗄️ Database Schema (Table Structure)

### 1. Companies
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique company identifier (PK) |
| `name` | String | Registered company name |
| `createdAt` | Date | Creation timestamp |

### 2. Users
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | User identifier (PK) |
| `company` | ObjectId | Reference to Company (FK) |
| `name` | String | Full name of the user |
| `email` | String | Login credential (Indexed) |
| `role` | Enum | ADMIN / HR / EMPLOYEE |
| `password` | String | Hashed password (bcrypt) |

### 3. Attendance
| Field | Type | Description |
| :--- | :--- | :--- |
| `employee` | ObjectId | Reference to User (FK) |
| `company` | ObjectId | Reference to Company (FK) |
| `month` | String | Payroll month (e.g., "January 2024") |
| `daysPresent` | Number | Total days worked |

### 4. Salary Components
| Field | Type | Description |
| :--- | :--- | :--- |
| `employee` | ObjectId | Reference to User (FK) |
| `baseSalary` | Number | Fixed base pay |
| `hra` | Number | House Rent Allowance |
| `bonus` | Number | Performance-based bonus |
| `deductions` | Number | Tax/PF/Other deductions |

### 5. Payroll (AI Processed)
| Field | Type | Description |
| :--- | :--- | :--- |
| `employee` | ObjectId | Reference to User (FK) |
| `netSalary` | Number | Calculated final payout |
| `leavePrediction` | String | AI Output (High/Low Probability) |

---

## 🧠 AI & Payroll Logic

### Calculation Formula
* **Gross Salary** = Base Salary + HRA + Bonus
* **Net Salary** = (Gross Salary / 30 × Days Present) − Deductions

### AI Leave Prediction Logic
| Condition | Prediction |
| :--- | :--- |
| Days Present < 20 | **High** leave probability |
| Days Present ≥ 20 | **Low** leave probability |

---

## 🛠️ API Reference

| Method | Endpoint | Role | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | All | Secure Authentication |
| `POST` | `/employees` | HR | Create new employee profile |
| `POST` | `/attendance` | HR | Update monthly attendance |
| `POST` | `/payroll/run` | HR | Execute payroll & AI engine |
| `GET` | `/payroll/me` | Employee | View personal salary slips |

---

## 🔒 Security & Deployment

* **Authentication:** Password hashing via `bcrypt` and session management via `JWT`.
* **Data Isolation:** All database queries are scoped by `companyId` to prevent cross-tenant data leaks.
* **Deployment:** * **Frontend:** Netlify
    * **Backend:** Render
    * **Database:** MongoDB Atlas

---

## 🔮 Future Enhancements
* [ ] Integration of real Machine Learning models for deeper AI insights.
* [ ] Automated PDF generation for payslips.
* [ ] Performance-based salary analytics and charts.
* [ ] Real-time notification system (Email/SMS).

---

## 💻 Installation

1. **Clone the repo:** `git clone https://github.com/username/zenvy.git`
2. **Install Backend Dependencies:** `cd backend && npm install`
3. **Install Frontend Dependencies:** `cd frontend && npm install`
4. **Configure Environment:** Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.
5. **Run App:** `npm start`

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
