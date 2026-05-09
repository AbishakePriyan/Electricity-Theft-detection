import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, RepeatVector, TimeDistributed, Dense
import json
import os

def prepare_data():
    print("Loading data...")
    # Skip the header row (dates)
    df = pd.read_csv('data set.csv', nrows=40000, skiprows=1, header=None)
    
    # Col 1034 is ID (CONS_NO), Col 1035 is Label (FLAG)
    ids = df.iloc[:, 1034]
    labels = df.iloc[:, 1035]
    consumption = df.iloc[:, :1034].apply(pd.to_numeric, errors='coerce').fillna(0)
    
    # Scale data
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(consumption)
    
    # Reshape for LSTM [samples, timesteps, features]
    # We treat the 1034 days as one sequence
    X = scaled_data.reshape(scaled_data.shape[0], scaled_data.shape[1], 1)
    
    return X, ids, labels, scaler

def build_model(input_shape):
    model = Sequential([
        LSTM(64, activation='relu', input_shape=input_shape, return_sequences=False),
        RepeatVector(input_shape[0]),
        LSTM(64, activation='relu', return_sequences=True),
        TimeDistributed(Dense(input_shape[1]))
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

def main():
    if not os.path.exists('data set.csv'):
        print("Data file not found!")
        return

    X, ids, labels, scaler = prepare_data()
    
    print("Building and training model (small sample)...")
    model = Sequential([
        LSTM(32, activation='relu', input_shape=(X.shape[1], 1)),
        RepeatVector(X.shape[1]),
        LSTM(32, activation='relu', return_sequences=True),
        TimeDistributed(Dense(1))
    ])
    model.compile(optimizer='adam', loss='mse')
    
    # Train on a very small subset to speed up for this demo
    model.fit(X[:500], X[:500], epochs=1, batch_size=32, verbose=1)
    
    print("Calculating reconstruction errors...")
    predictions = model.predict(X)
    mse = np.mean(np.power(X - predictions, 2), axis=1).flatten()
    
    # Normalize scores to 0-100
    risk_scores = (mse - mse.min()) / (mse.max() - mse.min()) * 100
    
    results = []
    for i in range(len(ids)):
        results.append({
            "id": str(ids[i]),
            "risk_score": float(risk_scores[i]),
            "label": int(labels[i]),
            "actual_label": int(labels[i]),
            "status": "Urgent" if risk_scores[i] > 80 else ("Pending" if risk_scores[i] > 40 else "Normal")
        })
        
    print("Saving results...")
    with open('consumer_data.json', 'w') as f:
        json.dump(results, f)
    
    # Also save a sample of consumption for the chart
    sample_consumption = {}
    for i in range(min(50, len(ids))):
        sample_consumption[str(ids[i])] = X[i].flatten().tolist()
    
    with open('consumption_samples.json', 'w') as f:
        json.dump(sample_consumption, f)

    print("Done!")

if __name__ == "__main__":
    main()
