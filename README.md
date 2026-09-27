# UrbanTransit IQ - Smart Public Transport Intelligence Platform

UrbanTransit IQ ek advanced Big Data aur Data Science-powered web application hai jo public transport networks (misal ke taur par Karachi transit system) ke large-scale operational data ko process, analyze, aur visualize karti hai. Yeh system overcrowding detect karne, delay patterns ko predict karne, passenger flow ko map karne, aur evidence-based schedule recommendations generate karne ke liye design kiya gaya hai[cite: 3].

---

## 🚀 Key Features & Capabilities
* **Executive & Operational Dashboards:** Real-time KPIs monitoring, on-time arrivals, passenger counts, and fleet utilization[cite: 3].
* **Dual-Pipeline Architecture:** Independent data processing and modeling using **PySpark/Spark MLlib** (Big Data pipeline) aur **Python Scikit-Learn** (Data Science pipeline) jisse result cross-verify hota hai[cite: 3].
* **Passenger Flow & OD Matrix:** Origin-Destination matrix analysis, boarding/alighting patterns, aur high-volume commuter routes tracking[cite: 3].
* **Predictive Analytics & Forecasting:** Demand forecasting, delay risk classification, occupancy prediction, aur route clustering[cite: 3].
* **What-If Scenario Simulator:** Fleet expansion, trip frequency adjustments, aur surge demand testing with real-time impact metrics[cite: 3].
* **Automated Recommendation Engine:** Actionable operational suggestions prioritized by passenger impact and severity[cite: 3].

---

## 🛠️ Technology Stack
* **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Lucide Icons, Deck.gl[cite: 3]
* **Backend:** Python FastAPI / Flask, RESTful APIs, SQLite Database[cite: 3]
* **Big Data & Processing:** Apache Spark, PySpark, Spark SQL, Hadoop HDFS (Parquet/CSV storage formats)[cite: 3]
* **Machine Learning:** Spark MLlib, Scikit-Learn, NumPy, Pandas, Joblib[cite: 3]

---

## ⚙️ Installation Instructions

### 1. Backend & Data Pipeline Setup
Python 3.10+ aur Java (Spark ke liye) installed hona chahiye.
```bash
# Backend folder mein jayein
cd backend

# Virtual environment create aur activate karein
python -m venv venv
source venv/bin/activate  # Windows par: venv\Scripts\activate

# Required dependencies install karein
pip install -r requirements.txt