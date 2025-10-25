# Rainfall Prediction System

## 📘 Overview
The Rainfall Prediction System is a machine learning project developed as part of a Kaggle competition focused on forecasting rainfall using real-world weather data.  
It is designed to accurately predict rainfall by leveraging advanced ML models, data preprocessing, and hyperparameter tuning to achieve high accuracy and reliability.  
All experiments, model training, and evaluation were performed in Google Colab.

## ⚙️Project Workflow
The project begins with data preprocessing and feature engineering in Google Colab, ensuring clean and meaningful input for the models. Five different algorithms were trained — Random Forest, XGBoost, LightGBM, Neural Network(MLP), and Support Vector Machine (SVM).  
Each model underwent hyperparameter tuning to optimize performance, followed by evaluation using the ROC-AUC score. The best-performing model was then selected and exported for production use.  

A Python backend was created to handle predictions, while a web interface built with HTML, CSS, and JavaScript allows users to input data and view prediction results interactively.

## 🛠️Technologies Used
The system utilizes Python and popular machine learning libraries such as Scikit-learn, XGBoost, LightGBM, and TensorFlow. Data manipulation was performed using Pandas and NumPy, while Matplotlib and Seaborn were used for visual analysis.  
For deployment, the backend was implemented using FastAPI, and the user interface was created using HTML, CSS, and JavaScript. The entire development and model training process was carried out in Google Colab.

## 📈 Output
The final system predicts the likelihood of rainfall based on user-provided weather parameters. Predictions are displayed through a simple and user-friendly web interface, making it easy for users to understand and interpret the results.
