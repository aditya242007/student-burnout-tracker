# 🧠 Student Burnout Tracker

This project is a simple web app that helps students understand how their daily habits (sleep, study time, stress) can affect burnout.

I built this while learning full-stack development to connect a real-life problem with basic data analysis.

---

## 🚀 What It Does

* Takes input:

  * Sleep hours
  * Study hours
  * Stress level

* Calculates a burnout score using a simple formula

* Shows:

  * Low burnout
  * Moderate burnout
  * High burnout

---

## 💡 Why I Built This

During college, I noticed that students often feel tired or stressed but don’t track the reasons behind it.

This project is an attempt to:

* Make those patterns visible
* Give a rough idea of burnout
* Encourage better habits

---

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS
* Node.js + Express (basic backend setup)

---

## 📊 Burnout Logic

The score is calculated like this:

burnout = (study × 1.5 + stress × 2) − sleep

* More stress and study → higher burnout
* More sleep → lower burnout

---

## ⚙️ How to Run

```bash
git clone https://github.com/aditya242007/student-burnout-tracker.git
cd student-burnout-tracker
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend (if used):

```bash
cd server
npm install
npm run dev
```

---

## ⚠️ Challenges I Faced

* Understanding how to manage form state in React
* Designing a simple but meaningful scoring formula
* Handling Git merge conflicts while pushing code

---

## 📌 Future Improvements

* Improve UI design
* Add charts for better visualization
* Store user history
* Improve accuracy of burnout calculation

---

## 🙌 Final Thoughts

This is a learning project where I focused more on understanding the logic and implementation rather than building a perfect system.

Open to feedback and improvements.
