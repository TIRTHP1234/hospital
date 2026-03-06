# 🏥 Hospital Administrative Analytics Dashboard

> **A real-time, AI-powered control center for hospital administrators to optimize patient flow, resolve bottlenecks, and manage emergency triage dynamically.**

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Twilio](https://img.shields.io/badge/Twilio-SMS_Alerts-F22F46?style=for-the-badge&logo=twilio)

---

## 📖 Overview
In modern healthcare facilities, seconds matter. Hospital administrators often struggle to get a real-time, unified view of bed occupancy, ER wait times, and staff distribution. 

This project solves this by delivering a **Real-Time Operational Pulse Dashboard** equipped with proactive **AI Insights**, **Smart Emergency Triage**, and **Real-World SMS Trigger Alerts**. It allows shift managers and department heads to monitor the hospital ecosystem at a glance and take immediate actions when thresholds are exceeded.

## ✨ Key Features & Technical Highlights

### 1. **AI Emergency Bed Finder (Triage Assistant)**
- **How it works:** When a critical emergency patient arrives and the hospital is nearing full capacity, administrators use the "AI Bed Finder".
- **Dynamic Reasoning:** The algorithm scans all currently admitted patients, calculating their *Age*, *Length of Stay (LOS)*, and *Department*. It outputs logical, natural-language reasoning identifying the most stable patients who can be safely discharged or stepped down to a discharge lounge.
- **Actionable UI:** Provides a confidence score and a one-click "Discharge Now" button to free up beds instantly.

### 2. **Real-Time Twilio SMS Alerts**
- **Automated Monitoring:** The `AlertsWidget` constantly monitors critical thresholds (e.g., ICU Bed Occupancy > 90%, ER Wait Times > 60 mins).
- **Node.js Integration:** When a threshold is breached, the frontend passes a payload securely to a local Express/Node server.
- **Twilio Dispatch:** The Express server interfaces with the Twilio SMS API to instantly text the Shift Manager, ensuring they are notified even if they aren't looking at the dashboard.

### 3. **Live Operational Dashboard**
- **Real-Time Data Sync:** Powered by Supabase Realtime; admission counters, discharges, and bed occupancies update completely live without refreshing the page.
- **Excel Export:** Easily export live patient directory lists direct to `.xlsx` for compliance and offline administrative reporting.
- **Data Visualizations:** Utilizes Recharts to render historical complaint resolution trends and 7-day department-by-department admission workloads.

---

## 🛠 Tech Stack

| Domain | Technology |
| --- | --- |
| **Frontend Framework** | React + Vite + TypeScript |
| **Styling & UI** | Tailwind CSS, Lucide-React Icons |
| **Charts & Visuals** | Recharts, react-countup |
| **Backend / Database** | Supabase (PostgreSQL + Auth + Realtime) |
| **Local Proxy / Alerts** | Express.js, Twilio Node SDK |
| **State Management** | React Query (TanStack) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Postgres database (Supabase recommended)
- Twilio Free/Trial Account (for SMS alerts)

### Local Development Setup

1. **Clone the repository & install dependencies**
   ```bash
   git clone <your-repo-url>
   cd hospital
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Twilio keys for the SMS backend
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```

3. **Start the Express API Server (Twilio Integration)**
   This local server handles sending SMS messages securely without exposing your Twilio tokens to the frontend.
   ```bash
   npm run start:server
   ```
   *The server will run on `http://localhost:3001`.*

4. **Start the Frontend Application**
   Open a new terminal window and run:
   ```bash
   npm run dev
   ```
   *The application will boot up on `http://localhost:5173`.*

---

## 📂 Project Structure

```text
hospital/
├── server/
│   └── index.ts               # Express Backend (Twilio SMS Payload Handler)
├── src/
│   ├── components/            
│   │   ├── common/            # Reusable Cards, AI Assistant FAB, Layout
│   │   ├── dashboard/         # Real-Time Charts, Alerts, Pulse Widgets
│   │   └── registration/      # Patient Directory, AI Triage Modal, Excel Export
│   ├── hooks/                 # Custom React Query + Supabase Data wrappers
│   ├── lib/                   # Supabase initialization client
│   └── pages/                 # Dashboard View vs. Registration View
└── supabase/
    ├── schema.sql             # SQL definitions for the PostgreSQL Database
    └── seed.sql               # Mock data generator for testing 
```

---

## 🎨 System Architecture & Database Schema
The Supabase PostgreSQL database revolves around **5 core tables**:
- `users` (Auth)
- `departments` (ER, ICU, Cardiology, etc.)
- `patients` (Demographics)
- `admissions` (The core transactional table linking patients to departments and bed numbers)
- `complaints` (Feedback tracking)

*Foreign keys ensure strict referential integrity (e.g., you cannot discharge a patient that hasn't been admitted, and you cannot place a patient into a non-existent department).*

---

## 🔮 Future Roadmap (Post-Hackathon)
- **Machine Learning Forecasts:** Replace the mock arrival predictions with a deployed Python FastAPI microservice utilizing `Prophet` to generate actual rolling 6-hour admission forecasts based on historical weather and event data.
- **Geospatial Heatmaps:** Map patient orgin zip-codes natively on the dashboard to track where emergency influxes are originating from.
- **Shift Scheduling Integration:** Connect the `staff` table metrics directly into a scheduling CMS for dynamic shift reassignment.
