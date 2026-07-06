# 🌱 AI-Based Crop Recommendation System

[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://aibasedcroprecommend.netlify.app)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)

> An AI-powered Crop Recommendation System that helps farmers identify the most suitable crop based on soil nutrients and environmental conditions. The application uses Machine Learning to analyze agricultural data and provide accurate crop recommendations, promoting **smart and sustainable farming**.

---

## 🌐 Live Demo

<p align="center">
  <a href="https://aibasedcroprecommend.netlify.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Click_Here-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo" />
  </a>
</p>

🔗 **https://aibasedcroprecommend.netlify.app**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered** | Machine Learning model trained on agricultural datasets |
| 🌾 **Crop Prediction** | Recommends the best crop based on 7 key parameters |
| ⚡ **Real-Time** | Instant predictions via Flask backend API |
| 📊 **Data-Driven** | Analyzes NPK levels, temperature, humidity, pH, and rainfall |
| 🎨 **Responsive UI** | Clean, modern interface that works on all devices |
| 🌍 **Accessible** | Web-based solution accessible from anywhere |

### Input Parameters

| Parameter | Description | Unit |
|-----------|-------------|------|
| **N** | Nitrogen content in soil | ppm |
| **P** | Phosphorus content in soil | ppm |
| **K** | Potassium content in soil | ppm |
| **Temperature** | Ambient temperature | °C |
| **Humidity** | Relative humidity | % |
| **pH** | Soil pH level | pH |
| **Rainfall** | Annual rainfall | mm |

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,flask,nodejs,html,css,js" alt="Tech Stack" />
</p>

### Frontend
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask" />
</p>

### Machine Learning
<p>
  <img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" alt="Scikit-Learn" />
  <img src="https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white" alt="Pandas" />
  <img src="https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white" alt="NumPy" />
  <img src="https://img.shields.io/badge/Pickle-3776AB?style=flat-square&logo=python&logoColor=white" alt="Pickle" />
</p>

### Deployment
<p>
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" alt="Netlify" />
</p>

---

## 📂 Project Structure
AI-BASED-CROP-RECOMMENDATION/
│
├── 📁 frontend/ # Frontend application
│ ├── 📄 index.html # Main HTML page
│ ├── 📄 style.css # Styling
│ ├── 📄 script.js # Client-side logic
│ ├── 📄 server.js # Node.js server
│ └── 📄 package.json # NPM dependencies
│
├── 📁 backend/ # Backend API
│ ├── 📄 app.py # Flask application
│ ├── 📄 config.py # Configuration
│ ├── 📄 train_model.py # Model training script
│ ├── 📄 requirements.txt # Python dependencies
│ │
│ ├── 📁 models/ # Trained models
│ │ ├── 📄 crop_model.pkl # Trained classifier
│ │ ├── 📄 crop_labels.pkl # Crop labels encoder
│ │ └── 📄 scaler.pkl # Feature scaler
│ │
│ ├── 📁 data/ # Dataset
│ │ └── 📄 crop_data.csv # Training data
│ │
│ └── 📁 utils/ # Utility functions
│
└── 📄 README.md # Project documentation

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 14+](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Based-Crop-Recommendation.git
cd AI-Based-Crop-Recommendation
2. Backend Setup
bash
cd backend
Create a Virtual Environment
bash
python -m venv venv
Activate the Virtual Environment
OS	Command
Windows	venv\Scripts\activate
Mac / Linux	source venv/bin/activate
Install Python Dependencies
bash
pip install -r requirements.txt
Run the Flask Backend
bash
python app.py
The backend server will start at http://localhost:5000

3. Frontend Setup
bash
cd frontend
Install NPM Packages
bash
npm install
Start the Frontend Server
bash
npm start
The frontend will be available at http://localhost:3000

📊 Machine Learning Model
Model Architecture
The recommendation engine uses a Random Forest Classifier trained on agricultural datasets.

Component	Description
Algorithm	Random Forest Classifier
Training Data	Crop recommendation dataset
Features	N, P, K, Temperature, Humidity, pH, Rainfall
Target	Crop Type (22 crop classes)
Preprocessing	StandardScaler for feature normalization
Model Performance
Accuracy: High accuracy in crop prediction

Generalization: Handles diverse soil and climate conditions

Scalability: Designed to incorporate additional data sources

Model Persistence
Trained models are saved using Python's pickle module:

text
models/
├── crop_model.pkl    # Trained Random Forest model
├── crop_labels.pkl   # Label encoder for crop names
└── scaler.pkl        # StandardScaler for input features
📷 Screenshots
<p align="center"> <img src="screenshots/home.png" alt="Home Page" width="45%" /> <img src="screenshots/prediction.png" alt="Prediction Interface" width="45%" /> </p> <p align="center"> <img src="screenshots/result.png" alt="Result Page" width="45%" /> </p>
🔮 Future Improvements

🦠 Disease Prediction – Early detection of crop diseases

📈 Yield Prediction – Estimate crop yield based on conditions

🌐 Multi-Language Support – Reach more farmers globally

📱 Mobile Application – Dedicated app for Android and iOS

📍 GPS-Based Recommendations – Location-specific crop suggestions

📊 Farmer Dashboard – Analytics and history tracking

🔔 Alert System – Notifications for optimal planting times

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch

bash
git checkout -b feature/amazing-feature
Commit your changes

bash
git commit -m "✨ Add amazing feature"
Push to the branch

bash
git push origin feature/amazing-feature
Open a Pull Request

Contribution Guidelines
Follow the existing code style

Write clear commit messages

Update documentation as needed

Add tests for new features

📄 License
This project is licensed under the MIT License.

text
MIT License

Copyright (c) 2024 Aakash

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
👨‍💻 Author
Aakash
<p align="left"> <a href="https://github.com/yourusername"> <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /> </a> <a href="https://linkedin.com/in/yourusername"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /> </a> <a href="mailto:youremail@example.com"> <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /> </a> </p>
⭐ Support
If you found this project useful, please consider giving it a ⭐ on GitHub!

<p align="center"> <a href="https://github.com/yourusername/AI-Based-Crop-Recommendation"> <img src="https://img.shields.io/github/stars/yourusername/AI-Based-Crop-Recommendation?style=social" alt="GitHub stars" /> </a> <a href="https://github.com/yourusername/AI-Based-Crop-Recommendation/network/members"> <img src="https://img.shields.io/github/forks/yourusername/AI-Based-Crop-Recommendation?style=social" alt="GitHub forks" /> </a> </p>
<p align="center"> Made with ❤️ for sustainable agriculture </p> ```
