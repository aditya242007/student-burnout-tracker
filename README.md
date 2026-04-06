<<<<<<< HEAD
# 🧠 Student Burnout Tracker

An intelligent full-stack web app that analyzes student lifestyle data (sleep, study, stress, screen time) and predicts burnout levels with actionable recommendations.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-cyan) ![Express](https://img.shields.io/badge/Express-4-green) ![MongoDB](https://img.shields.io/badge/MongoDB-8-darkgreen)

## ✨ Features

- 📊 **Burnout Analysis** — Score calculation based on sleep, study, stress & screen time
- 📈 **Data Visualization** — Bar, Pie, and Line charts using Recharts
- 🤖 **Smart Recommendations** — AI-like personalized wellness tips
- 📅 **History Tracking** — View and manage past entries
- 📄 **PDF Export** — Download formatted burnout reports
- 💬 **Wellness Chatbot** — Rule-based mental health tips bot
- 🌙 **Dark Mode** — System-aware with manual toggle
- 📱 **Fully Responsive** — Mobile + Desktop ready

## 🛠️ Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | React 19, Vite 8, Tailwind CSS v4 |
| Charts    | Recharts                           |
| Animation | Framer Motion                      |
| Backend   | Node.js, Express                   |
| Database  | MongoDB (optional, in-memory fallback) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (optional — app works without it)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/student-burnout-tracker.git
cd student-burnout-tracker

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

### Running

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## 📐 Burnout Formula

```
burnout_score = (study_hours × 1.5 + stress_level × 2 + screen_time × 1) − sleep_hours
```

| Score   | Level    |
|---------|----------|
| < 15    | 🟢 Low   |
| 15–25   | 🟡 Moderate |
| > 25    | 🔴 High  |

## 📁 Project Structure

```
student-burnout-tracker/
├── client/              # React frontend
│   └── src/
│       ├── components/  # Navbar, Form, Charts, etc.
│       └── pages/       # Home, Dashboard
└── server/              # Express backend
    ├── models/          # Mongoose schema
    ├── controllers/     # CRUD + burnout logic
    ├── routes/          # API endpoints
    └── utils/           # Scoring engine
```

## 📝 License

MIT
=======
# student-burnout-tracker
>>>>>>> 3e0b6c90f96f7a92629ed7f8f20014e6a8b0ca03
