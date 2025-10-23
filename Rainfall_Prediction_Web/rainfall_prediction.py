from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware

model = pickle.load(open(r"C:\Users\PC\Downloads\best_model.pkl", "rb"))
scaler = pickle.load(open(r"C:\Users\PC\Downloads\scaler.pkl", "rb"))

app = FastAPI(title="Rainfall Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def get_predictions(
    day: int,
    pressure: float,
    maxtemp: float,
    temparature: float,
    mintemp: float,
    dewpoint: float,
    humidity: float,
    cloud: float,
    sunshine: float,
    winddirection: float,
    windspeed: float
):
    try:
        if not (0 <= cloud):
            return {"error": "Cloud must be non-negative"}

        if sunshine < 0:
            return {"error": "Sunshine must be non-negative"}

        if not (0 <= winddirection <= 360):
            return {"error": "Wind direction must be between 0 and 360 degrees"}

        if windspeed < 0:
            return {"error": "Windspeed must be non-negative"}

        if not (0 <= humidity <= 100):
            return {"error": "Humidity must be between 0 and 100"}

        if mintemp >= maxtemp:
            return {"error": "Mintemp must be lower than Maxtemp"}

        if not (1 <= day <= 365):
            return {"error": "Day must be between 1 and 365"}

        if pressure >= 1200:
            return {"error": "Pressure must be below 1200 hPa"}

        user_input_data = [
            day, pressure, maxtemp, temparature, mintemp,
            dewpoint, humidity, cloud, sunshine, winddirection, windspeed
        ]

        scaled_input = scaler.transform([user_input_data])

        prediction = model.predict(scaled_input)
        prob = model.predict_proba(scaled_input)[0][1]

        return {
            "prediction": "Rainfall" if int(prediction) == 1 else "No Rainfall",
            "confidence": round(float(prob if prediction == 1 else 1 - prob), 4)
        }

    except Exception as e:
        return {"error": str(e)}
