# ZENVY – AI Powered Payroll System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Build](https://img.shields.io/badge/Build-Production--Ready-blue)

**ZENVY** is a full‑stack, AI‑assisted Payroll Management System. It supports multi‑company (multi‑tenant) architecture with strict data isolation, role‑based access control, and automated salary computation.

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

ZENVY automates the payroll run using a standardized industrial formula:

$$Gross\ Salary = Base\ Salary + HRA + Bonus$$
$$Net\ Salary = \left(\frac{Gross\ Salary}{30} \times Days\ Present\right) - Deductions$$


### AI Leave Prediction Logic
| Condition | Prediction |
| :--- | :--- |
| Days Present < 20 | **High** leave probability |
| Days Present ≥ 20 | **Low** leave probability |

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

* **Authentication:** Password hashing via `bcrypt` and session management via `JWT`.
* **Data Isolation:** All database queries are scoped by `companyId` to prevent cross-tenant data leaks.
* **Deployment** **Infrastructure:**
    * **Frontend:** Hosted on **Netlify** (Global CDN).
    * **Backend:** Managed on **Render** (Auto-scaling).
    * **Database:** **MongoDB Atlas** (Cloud Clusters).

---

## 🔮 Future Enhancements
* [ ] Integration of real Machine Learning models for deeper AI insights.
* [ ] Automated PDF generation for payslips.
* [ ] Performance-based salary analytics and charts.
* [ ] Real-time notification system (Email/SMS).

---

## 💻 Installation & Setup

### 1. Clone & Install
```bash
git clone [https://github.com/username/zenvy.git](https://github.com/username/zenvy.git)
cd zenvy && npm run install-all
```
### 2. Install Backend Dependencies:
```bash
cd backend && npm install
```
### 3. Install Frontend Dependencies:

cd frontend && npm install`

### 4. Configure Environment:
Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.

### 5. Run App:
`npm start`




