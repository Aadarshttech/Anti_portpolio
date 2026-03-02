import joblib
import os

pkl_path = "milk_model.pkl"
try:
    if os.path.exists(pkl_path):
        data = joblib.load(pkl_path)
        print("Keys in pkl:", list(data.keys()))
        if "model" in data:
            print("Model type:", type(data["model"]))
        if "feature_cols" in data:
            print("Features:", data["feature_cols"])
    else:
        print("File not found")
except Exception as e:
    print("Error:", e)
