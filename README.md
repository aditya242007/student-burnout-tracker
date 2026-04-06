# 🧠 Student Burnout Tracker

This project is a simple web app that helps students understand how their daily habits (sleep, study, stress) can affect burnout.

I built this while learning full-stack development and wanted to connect a real-life problem with a simple web-based solution.

---

## 🚀 What It Does

* Takes input:

  * Sleep hours
  * Study hours
  * Stress level

* Calculates a burnout score

* Displays:

  * Low burnout
  * Moderate burnout
  * High burnout

---

## 💡 Why I Built This

During college, I noticed that students often feel stressed but don’t track what causes it.

This project helps visualize that connection in a simple way.

---

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS
* Node.js + Express (basic backend)

---

## ⚙️ How to Run (Important)

### 1. Clone the repo

```bash
git clone https://github.com/aditya242007/student-burnout-tracker.git
cd student-burnout-tracker
```

---

### 2. Run Frontend

```bash
cd client
npm install
npm run dev
```

👉 Open in browser:

```
http://localhost:5173
```

(or 5174 if port changes)

---

### 3. Fix Common Issue (Important ⚠️)

If you see error related to **dompurify**:

```
Failed to resolve import "dompurify"
```

👉 Run:

```bash
npm install dompurify
```

---

### 4. Mac Permission Fix (if npm error comes)

If you get:

```
EACCES: permission denied
```

👉 Run:

```bash
sudo chown -R $(whoami) ~/.npm
```

Then again:

```bash
npm install
```

---

## ⚠️ Issues I Faced

* Dependency errors after running `npm audit fix --force`
* Missing packages like `dompurify`
* Git merge conflicts while pushing to GitHub
* Port already in use issues

---

## 📊 Burnout Logic

burnout = (study × 1.5 + stress × 2) − sleep

* More stress & study → higher burnout
* More sleep → lower burnout

---

## 📌 Future Improvements

* Add better UI
* Add charts for visualization
* Store user history
* Improve scoring logic

---

## 🙌 Final Thoughts

This is a learning project focused on understanding real-world problems and implementing them step by step.

If you face any issue, feel free to raise it or suggest improvements.
