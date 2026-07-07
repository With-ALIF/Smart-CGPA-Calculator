# 🎓 CGPA Calculator

A modern, feature-rich, and fully responsive **CGPA Calculator** built with **React + Vite**. It helps students calculate their CGPA, analyze academic performance, plan future semesters, and explore different grade scenarios through an intuitive and beautiful interface.

## ✨ Features

### 📚 CGPA Calculator
- Select **1–15 subjects**
- Dynamic subject rows
- Credit & grade dropdowns
- Instant CGPA calculation
- Automatic quality point calculation
- Total credits & average grade point
- Highest and lowest grade detection
- One-click reset

### 📊 Result Dashboard
- Final CGPA
- Total Credits
- Total Quality Points
- Average Grade Point
- Highest Grade
- Lowest Grade


### 🎯 Target CGPA Calculator
Calculate the GPA required in your remaining credits to achieve your target CGPA.

Includes:
- Current CGPA
- Target CGPA
- Required GPA
- Impossible target detection

### 🔄 What-If Calculator
Experiment with different grading scenarios without modifying the original calculation.

Examples:
- Change a **B+ → A**
- Change an **F → B**
- Compare updated CGPA instantly

### ℹ️ Grade Information
Built-in grade scale reference with:
- Letter Grade Table
- GPA Values
- CGPA Formula
- Formula explanation

### 💾 Local Storage
Automatically saves:
- Subject count
- Credits
- Grades

Restores everything automatically after refresh.

### 🌙 Theme Support
- Light Mode
- Dark Mode
- System Theme support

### 📱 Responsive Design
Optimized for:
- Desktop
- Laptop
- Tablet
- Mobile

---

# 🚀 Tech Stack

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 🎬 Framer Motion
- 📊 Recharts
- 🧭 React Router DOM
- 🎯 Lucide React

---

# 📁 Project Structure

```yaml
├── App.jsx
├── components
│   ├── Footer.jsx
│   ├── GradeDistribution.jsx
│   ├── GradeInfoModal.jsx
│   ├── Header.jsx
│   ├── planner
│   │   ├── constants.js
│   │   ├── insights.js
│   │   ├── InsightsPanel.jsx
│   │   ├── PerformanceCards.jsx
│   │   ├── PerformancePanel.jsx
│   │   ├── PlannerControls.jsx
│   │   ├── PlannerHeader.jsx
│   │   ├── PlannerHeaderSection.jsx
│   │   ├── PlannerInputSection.jsx
│   │   ├── PlannerMainLayout.jsx
│   │   ├── PlannerPage.jsx
│   │   ├── PlannerRequiredCard.jsx
│   │   ├── PlannerRoot.jsx
│   │   ├── PlannerSummary.jsx
│   │   ├── PlannerSummaryPanel.jsx
│   │   ├── PlannerTopControls.jsx
│   │   ├── PlannerTopStats.jsx
│   │   ├── SemesterInputs.jsx
│   │   ├── StatsCards.jsx
│   │   ├── ui.js
│   │   ├── usePlannerCalculations.js
│   │   ├── usePlannerState.js
│   │   └── usePlannerValidation.js
│   ├── ResultDashboard.jsx
│   ├── SubjectTable.jsx
│   ├── TargetCalculator.jsx
│   └── WhatIfCalculator.jsx
├── data
│   └── grades.js
├── main.jsx
├── pages
│   ├── CalculatorPage.jsx
│   └── ToolsPage.jsx
└── styles.css

```

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/With-ALIF/Smart-CGPA-Calculator.git
```

Go to the project directory:

```bash
cd Smart-CGPA-Calculator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🧮 CGPA Formula

```text
CGPA = Σ(Grade Point × Credit) ÷ Σ(Credit)
```

Example:

```text
(4.00 × 3) + (3.75 × 3) + (3.50 × 2)
─────────────────────────────────────
             Total Credits
```

---

# 🎨 Design Highlights

- Modern Glassmorphism UI
- Purple & Blue Gradient Theme
- Smooth Animations
- Rounded Cards
- Soft Shadows
- Responsive Layout
- Mobile-First Design
- Interactive Charts
- Accessible Components
- Clean Typography

---

# 🔮 Future Improvements

- Semester-wise CGPA tracking
- Multiple grading systems
- GPA history
- PDF report customization
- Cloud sync
- Authentication
- Multi-language support
- Academic progress timeline

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Abdullah Al Khalid Alif**

Built with ❤️ using **React**, **Vite**, and **Tailwind CSS**.