🌱 AI-Based Crop Recommendation System
Smart Farming • Data-Driven Decisions • Sustainable Agriculture

https://img.shields.io/badge/Hackathon-Ready-FF6B6B?style=for-the-badge
https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white
https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge

📌 Table of Contents
Problem Statement

Our Solution

How It Works

Key Features

Tech Stack

Live Demo

Installation & Setup

Usage Guide

Screenshots

Team

Future Scope

Acknowledgments

🎯 Problem Statement
Agriculture is the backbone of many economies, yet farmers often struggle with crop selection due to:

Unpredictable weather patterns

Soil degradation and nutrient imbalances

Lack of access to data-driven insights

Traditional farming practices that may not optimize yield

Choosing the wrong crop for a given piece of land can lead to:

Reduced yield and income

Wastage of resources (water, fertilizers)

Soil exhaustion and environmental harm

Our goal: Empower farmers with an AI-powered tool that recommends the most suitable crop based on soil nutrients and environmental conditions — enabling precision agriculture and sustainable farming.

💡 Our Solution
We built a web-based Crop Recommendation System that uses Machine Learning to analyze seven key parameters:

Nitrogen (N), Phosphorus (P), Potassium (K) – soil nutrient levels

Temperature, Humidity, pH, Rainfall – environmental factors

The model predicts the best crop from 22 different options, providing instant, actionable recommendations through a user-friendly interface.

Why Our Solution Stands Out
Feature	Benefit
AI-Driven Accuracy	Trained on real agricultural data for high precision
Fast & Real-Time	Flask API returns predictions in milliseconds
Accessible	Web-based, works on any device with a browser
Easy to Use	Simple input form, clear results
Scalable	Can be extended with additional data sources (weather APIs, satellite imagery)
Open Source	Free for anyone to use, modify, and improve
⚙️ How It Works








User enters soil and climate data via the web form.

Frontend sends a POST request to the Flask API (hosted on the backend).

Flask receives the data, scales it, and passes it to the Random Forest classifier.

The model predicts the most suitable crop.

The result is sent back and displayed to the user.

✨ Key Features
🤖 AI-Powered Prediction – Uses a Random Forest model with ~99% accuracy on test data.

🌾 Comprehensive Input – Considers 7 critical parameters for holistic assessment.

📊 Data Visualization – (Optional) Display charts of input vs. recommended crop.

⚡ Fast Response – Predictions delivered in under 1 second.

🌍 Responsive Design – Works seamlessly on desktop, tablet, and mobile.

🔗 RESTful API – Easy integration with other applications.

📦 Offline Ready – Model runs locally; no internet required after setup.

🛠️ Tech Stack
<p align="center"> <img src="https://skillicons.dev/icons?i=python,flask,nodejs,html,css,js" alt="Tech Stack" /> </p>
Layer	Technology
Frontend	HTML5, CSS3, JavaScript, Node.js
Backend	Python, Flask
Machine Learning	Scikit-Learn, Pandas, NumPy, Pickle
Deployment	Netlify (frontend), PythonAnywhere / Render (backend)
🌐 Live Demo
🚀 Try it now: https://aibasedcroprecommend.netlify.app

🚀 Installation & Setup
Prerequisites
Python 3.8+

Node.js 14+

Git

Quick Start (One-Line Commands)
bash
# Clone the repository
git clone https://github.com/yourusername/AI-Based-Crop-Recommendation.git
cd AI-Based-Crop-Recommendation

# Set up and run backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py &

# Set up and run frontend (in a new terminal)
cd ../frontend
npm install
npm start
Your app will be live at http://localhost:3000 (frontend) and http://localhost:5000 (backend API).

Detailed Steps
<details> <summary><b>Click for detailed installation guide</b></summary>
1. Clone the repository
bash
git clone https://github.com/yourusername/AI-Based-Crop-Recommendation.git
cd AI-Based-Crop-Recommendation
2. Backend Setup
bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
3. Frontend Setup (new terminal)
bash
cd frontend
npm install
npm start
4. Access the application
Frontend: http://localhost:3000

Backend API: http://localhost:5000 (for testing)

</details>
📖 Usage Guide
Open the application in your browser.

Enter the following parameters:

Nitrogen (N) – e.g., 90

Phosphorus (P) – e.g., 40

Potassium (K) – e.g., 30

Temperature (°C) – e.g., 25

Humidity (%) – e.g., 70

pH – e.g., 6.5

Rainfall (mm) – e.g., 200

Click the "Predict Crop" button.

View the recommended crop and additional information (if any).

Repeat for different conditions.

💡 Tip: Use real field data for the most accurate recommendations.

📷 Screenshots
Home Page	Prediction Result
https://screenshots/home.png	https://screenshots/result.png
(Replace with actual screenshots)

👥 Team
Name	Role
Aakash	Full-Stack Developer & ML Engineer
🔮 Future Scope
🌤️ Real-time Weather Integration – Pull live weather data for location-based predictions.

🧪 Fertilizer Recommendation – Suggest optimal fertilizers and quantities.

🦠 Disease Prediction – Detect crop diseases from leaf images (deep learning).

📈 Yield Estimation – Predict expected yield for recommended crop.

📱 Mobile App – Native Android/iOS app for offline use.

🗺️ GIS Integration – Map-based crop suitability analysis.

🌐 Multilingual Support – Reach farmers in their native languages.

📊 Farmer Dashboard – Track historical predictions and outcomes.

🙏 Acknowledgments
Dataset: Crop Recommendation Dataset (Kaggle)

Inspiration: Sustainable Development Goals (SDG 2 – Zero Hunger)

Built with ❤️ for the Hackathon community.

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

⭐ Support Us
If this project helps you, please give it a ⭐ on GitHub and share it with fellow farmers and developers!

<p align="center"> <a href="https://github.com/yourusername/AI-Based-Crop-Recommendation"> <img src="https://img.shields.io/github/stars/yourusername/AI-Based-Crop-Recommendation?style=social" alt="GitHub stars" /> </a> <a href="https://github.com/yourusername/AI-Based-Crop-Recommendation/network/members"> <img src="https://img.shields.io/github/forks/yourusername/AI-Based-Crop-Recommendation?style=social" alt="GitHub forks" /> </a> </p>
<p align="center"> <i>“Empowering farmers with AI – one prediction at a time.”</i> </p>
where is project structure add that too
We need to add the project structure section, which was present in the previous version but missing from the "hackthon ready" version. The user asked for "hackthon ready readme from start to end" and likely expects all sections, including project structure. I'll add a clear project structure section with a tree diagram. I'll also ensure the overall README is comprehensive and professional, with the added structure section.

Let's produce the revised README with the project structure included. I'll keep all the other improvements and add the structure after the Tech Stack or before Installation.

Also note: The user said "made it hackthon ready readme from start to end" - they might want a complete README ready for a hackathon submission. So I'll ensure it includes all typical sections: problem, solution, features, tech stack, installation, usage, screenshots, team, future scope, etc.

I'll produce the final README with project structure included.

Let's write it.

I've updated the README to include a detailed Project Structure section, making it fully hackathon-ready from start to finish.

🌱 AI-Based Crop Recommendation System
Smart Farming • Data-Driven Decisions • Sustainable Agriculture

https://img.shields.io/badge/Hackathon-Ready-FF6B6B?style=for-the-badge
https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white
https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge

📌 Table of Contents
Problem Statement

Our Solution

How It Works

Key Features

Tech Stack

Project Structure

Live Demo

Installation & Setup

Usage Guide

Screenshots

Team

Future Scope

Acknowledgments

🎯 Problem Statement
Agriculture is the backbone of many economies, yet farmers often struggle with crop selection due to:

Unpredictable weather patterns

Soil degradation and nutrient imbalances

Lack of access to data-driven insights

Traditional farming practices that may not optimize yield

Choosing the wrong crop for a given piece of land can lead to:

Reduced yield and income

Wastage of resources (water, fertilizers)

Soil exhaustion and environmental harm

Our goal: Empower farmers with an AI-powered tool that recommends the most suitable crop based on soil nutrients and environmental conditions — enabling precision agriculture and sustainable farming.

💡 Our Solution
We built a web-based Crop Recommendation System that uses Machine Learning to analyze seven key parameters:

Nitrogen (N), Phosphorus (P), Potassium (K) – soil nutrient levels

Temperature, Humidity, pH, Rainfall – environmental factors

The model predicts the best crop from 22 different options, providing instant, actionable recommendations through a user-friendly interface.

Why Our Solution Stands Out
Feature	Benefit
AI-Driven Accuracy	Trained on real agricultural data for high precision
Fast & Real-Time	Flask API returns predictions in milliseconds
Accessible	Web-based, works on any device with a browser
Easy to Use	Simple input form, clear results
Scalable	Can be extended with additional data sources (weather APIs, satellite imagery)
Open Source	Free for anyone to use, modify, and improve
⚙️ How It Works








User enters soil and climate data via the web form.

Frontend sends a POST request to the Flask API (hosted on the backend).

Flask receives the data, scales it, and passes it to the Random Forest classifier.

The model predicts the most suitable crop.

The result is sent back and displayed to the user.

✨ Key Features
🤖 AI-Powered Prediction – Uses a Random Forest model with ~99% accuracy on test data.

🌾 Comprehensive Input – Considers 7 critical parameters for holistic assessment.

📊 Data Visualization – (Optional) Display charts of input vs. recommended crop.

⚡ Fast Response – Predictions delivered in under 1 second.

🌍 Responsive Design – Works seamlessly on desktop, tablet, and mobile.

🔗 RESTful API – Easy integration with other applications.

📦 Offline Ready – Model runs locally; no internet required after setup.

🛠️ Tech Stack
<p align="center"> <img src="https://skillicons.dev/icons?i=python,flask,nodejs,html,css,js" alt="Tech Stack" /> </p>
Layer	Technology
Frontend	HTML5, CSS3, JavaScript, Node.js
Backend	Python, Flask
Machine Learning	Scikit-Learn, Pandas, NumPy, Pickle
Deployment	Netlify (frontend), PythonAnywhere / Render (backend)
📂 Project Structure
text
AI-BASED-CROP-RECOMMENDATION/
│
├── 📁 frontend/                    # Frontend application
│   ├── 📄 index.html               # Main HTML page
│   ├── 📄 style.css                # CSS styling
│   ├── 📄 script.js                # Client-side JavaScript (API calls, UI logic)
│   ├── 📄 server.js                # Node.js server for serving frontend
│   └── 📄 package.json             # NPM dependencies and scripts
│
├── 📁 backend/                     # Backend API and ML components
│   ├── 📄 app.py                   # Flask application (endpoints, routing)
│   ├── 📄 config.py                # Configuration settings (e.g., model paths)
│   ├── 📄 train_model.py           # Script to train and save the ML model
│   ├── 📄 requirements.txt         # Python package dependencies
│   │
│   ├── 📁 models/                  # Trained model artifacts
│   │   ├── 📄 crop_model.pkl       # Trained Random Forest classifier
│   │   ├── 📄 crop_labels.pkl      # Label encoder mapping crop names
│   │   └── 📄 scaler.pkl           # StandardScaler for feature normalization
│   │
│   ├── 📁 data/                    # Dataset
│   │   └── 📄 crop_data.csv        # Training data (N, P, K, temp, humidity, pH, rainfall, label)
│   │
│   └── 📁 utils/                   # Utility functions
│       └── 📄 helpers.py           # Helper functions (data preprocessing, etc.)
│
├── 📁 screenshots/                 # Screenshots for documentation
│   ├── home.png
│   └── result.png
│
├── 📄 README.md                    # Project documentation
└── 📄 LICENSE                      # MIT License
🌐 Live Demo
🚀 Try it now: https://aibasedcroprecommend.netlify.app

🚀 Installation & Setup
Prerequisites
Python 3.8+

Node.js 14+

Git

Quick Start (One-Line Commands)
bash
# Clone the repository
git clone https://github.com/yourusername/AI-Based-Crop-Recommendation.git
cd AI-Based-Crop-Recommendation

# Set up and run backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py &

# Set up and run frontend (in a new terminal)
cd ../frontend
npm install
npm start
Your app will be live at http://localhost:3000 (frontend) and http://localhost:5000 (backend API).

Detailed Steps
<details> <summary><b>Click for detailed installation guide</b></summary>
1. Clone the repository
bash
git clone https://github.com/yourusername/AI-Based-Crop-Recommendation.git
cd AI-Based-Crop-Recommendation
2. Backend Setup
bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
3. Frontend Setup (new terminal)
bash
cd frontend
npm install
npm start
4. Access the application
Frontend: http://localhost:3000

Backend API: http://localhost:5000 (for testing)

</details>
📖 Usage Guide
Open the application in your browser.

Enter the following parameters:

Nitrogen (N) – e.g., 90

Phosphorus (P) – e.g., 40

Potassium (K) – e.g., 30

Temperature (°C) – e.g., 25

Humidity (%) – e.g., 70

pH – e.g., 6.5

Rainfall (mm) – e.g., 200

Click the "Predict Crop" button.

View the recommended crop and additional information (if any).

Repeat for different conditions.

💡 Tip: Use real field data for the most accurate recommendations.

📷 Screenshots
Home Page	Prediction Result
https://screenshots/home.png	https://screenshots/result.png
(Replace with actual screenshots)

👥 Team
Name	Role
Aakash	Full-Stack Developer & ML Engineer
🔮 Future Scope
🌤️ Real-time Weather Integration – Pull live weather data for location-based predictions.

🧪 Fertilizer Recommendation – Suggest optimal fertilizers and quantities.

🦠 Disease Prediction – Detect crop diseases from leaf images (deep learning).

📈 Yield Estimation – Predict expected yield for recommended crop.

📱 Mobile App – Native Android/iOS app for offline use.

🗺️ GIS Integration – Map-based crop suitability analysis.

🌐 Multilingual Support – Reach farmers in their native languages.

📊 Farmer Dashboard – Track historical predictions and outcomes.

🙏 Acknowledgments
Dataset: Crop Recommendation Dataset (Kaggle)

Inspiration: Sustainable Development Goals (SDG 2 – Zero Hunger)

Built with ❤️ for the Hackathon community.

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

⭐ Support Us
If this project helps you, please give it a ⭐ on GitHub and share it with fellow farmers and developers!

<p align="center"> <a href="https://github.com/yourusername/AI-Based-Crop-Recommendation"> <img src="https://img.shields.io/github/stars/yourusername/AI-Based-Crop-Recommendation?style=social" alt="GitHub stars" /> </a> <a href="https://github.com/yourusername/AI-Based-Crop-Recommendation/network/members"> <img src="https://img.shields.io/github/forks/yourusername/AI-Based-Crop-Recommendation?style=social" alt="GitHub forks" /> </a> </p>
<p align="center"> <i>“Empowering farmers with AI – one prediction at a time.”</i> </p>
