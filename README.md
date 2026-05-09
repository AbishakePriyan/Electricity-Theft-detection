# GridWatch AI: Electricity Theft Detection System

GridWatch AI is a full-stack anomaly detection platform designed to identify electricity theft and irregular consumption patterns using deep learning. It leverages an LSTM Autoencoder model to analyze time-series consumption data and provides a professional dashboard for utility providers to monitor risks in real-time.

## 🚀 Key Features

- **Deep Learning Core**: Uses an **LSTM Autoencoder** to calculate reconstruction errors, identifying consumption patterns that deviate from normal behavior.
- **Real-Time Dashboard**: High-level overview of total consumers, detected thefts, and average risk across the grid.
- **Consumer Analysis**: Detailed drill-down into individual consumer profiles with interactive time-series charts (Recharts).
- **Risk Scoring System**: Automatically categorizes consumers into 'Normal', 'Moderate Risk', and 'Urgent' (Theft Likely) based on anomaly scores.
- **Performance Monitoring**: Visualization of model metrics including Accuracy, Precision, Recall, and F1-score.
- **Modern UI**: A responsive, enterprise-grade dark theme built with Tailwind CSS v4.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

### Backend
- **API Framework**: FastAPI (Python)
- **Data Processing**: Pandas, NumPy
- **Machine Learning**: TensorFlow / Keras (LSTM Autoencoder)
- **Database**: JSON-based storage (for precomputed analysis)

## 📦 Project Structure

```text
├── frontend/                # React Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Dashboard, Consumer Analysis, etc.
│   │   └── api.ts           # Axios configuration
├── main.py                  # FastAPI Backend entry point
├── precompute_scores.py     # ML pipeline (Data prep, Model Training, Scoring)
├── consumer_data.json       # Analysis results
└── consumption_samples.json # Time-series data for visualization
```

## ⚙️ Setup Instructions

### 1. Backend Setup
```bash
# Install dependencies
pip install fastapi uvicorn pandas numpy tensorflow scikit-learn

# Run the ML pipeline to generate analysis (Requires data set.csv)
python precompute_scores.py

# Start the API server
python main.py
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧠 How it Works
The system treats electricity consumption over time as a sequence. The **LSTM Autoencoder** is trained to reconstruct normal consumption patterns. When presented with anomalous data (theft), the model produces a high reconstruction error (Mean Squared Error). These errors are then normalized into a **Risk Score (0-100)**:
- **0-40**: Normal Consumption
- **40-80**: Suspicious Activity (Moderate Risk)
- **80-100**: Highly Probable Theft (Urgent)

## 📄 License
This project is for educational and research purposes.
