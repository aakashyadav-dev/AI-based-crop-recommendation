// script.js - Complete fixed version
const API_BASE_URL = (() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        if (window.location.port === '3000') {
            return '/api';
        } else {
            return 'https://ai-based-crop-recommendation-n3is.onrender.com/api';
        }
    }
    return '/api';
})();

console.log('🌐 API Base URL:', API_BASE_URL);

// Sample data based on your CSV averages
const SAMPLE_DATA = {
    rice: {
        N: 90,
        P: 42,
        K: 43,
        temperature: 20.8,
        humidity: 82.0,
        ph: 6.5,
        rainfall: 202.9,
        soil_type: 'clay',
        name: 'Rice (Sample from dataset)'
    },
    wheat: {
        N: 110,
        P: 55,
        K: 45,
        temperature: 22,
        humidity: 65,
        ph: 7.2,
        rainfall: 75,
        soil_type: 'loamy',
        name: 'Wheat'
    },
    maize: {
        N: 85,
        P: 58,
        K: 41,
        temperature: 21.7,
        humidity: 80.3,
        ph: 7.0,
        rainfall: 226.6,
        soil_type: 'sandy loam',
        name: 'Maize (Sample from dataset)'
    },
    cotton: {
        N: 95,
        P: 48,
        K: 52,
        temperature: 30,
        humidity: 60,
        ph: 7.5,
        rainfall: 65,
        soil_type: 'black',
        name: 'Cotton'
    }
};

// Global variables
let cropChart = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Crop Recommendation System...');
    initApp();
});

async function initApp() {
    try {
        // Test backend connection
        await testBackendConnection();
        
        // Initialize components
        initMobileMenu();
        initLanguageToggle();
        initFormFunctionality();
        initWeatherFunctionality();
        await loadCropsData();
        initCropSearch();
        initSmoothScrolling();
        
        // Set default form values from your dataset
        setDefaultFormValues();
        
        console.log('✅ App initialized successfully');
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        showNotification('Using offline mode - backend connection failed', 'warning');
        // Set default values anyway
        setDefaultFormValues();
    }
}

// Set default form values from your dataset
function setDefaultFormValues() {
    // Use rice sample data as default
    const defaultValues = {
        nitrogen: 90,
        phosphorus: 42,
        potassium: 43,
        temperature: 20.8,
        humidity: 82.0,
        ph: 6.5,
        rainfall: 202.9,
        soil_type: 'clay'
    };
    
    // Set all input fields
    document.getElementById('nitrogen').value = defaultValues.nitrogen;
    document.getElementById('nitrogen-range').value = defaultValues.nitrogen;
    document.getElementById('phosphorus').value = defaultValues.phosphorus;
    document.getElementById('phosphorus-range').value = defaultValues.phosphorus;
    document.getElementById('potassium').value = defaultValues.potassium;
    document.getElementById('potassium-range').value = defaultValues.potassium;
    document.getElementById('temperature').value = defaultValues.temperature;
    document.getElementById('temperature-range').value = defaultValues.temperature;
    document.getElementById('humidity').value = defaultValues.humidity;
    document.getElementById('humidity-range').value = defaultValues.humidity;
    document.getElementById('ph').value = defaultValues.ph;
    document.getElementById('ph-range').value = defaultValues.ph;
    document.getElementById('rainfall').value = defaultValues.rainfall;
    document.getElementById('rainfall-range').value = defaultValues.rainfall;
    document.getElementById('soil-type').value = defaultValues.soil_type;
    
    console.log('✅ Default form values set from dataset');
}

// Test backend connection
async function testBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'healthy') {
            console.log('✅ Backend connection successful');
            console.log(`✅ Available crops: ${data.available_crops}`);
            showNotification('Connected to backend successfully!', 'success');
            return true;
        } else {
            throw new Error('Backend health check failed');
        }
    } catch (error) {
        console.error('❌ Backend connection failed:', error);
        showNotification('Cannot connect to backend on port 5001. Please start the backend server.', 'error');
        throw error;
    }
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }));
}

function initLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'en';
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            if (currentLanguage === 'en') {
                currentLanguage = 'hi';
                languageToggle.textContent = 'English';
                translateToHindi();
            } else {
                currentLanguage = 'en';
                languageToggle.textContent = 'हिंदी';
                translateToEnglish();
            }
        });
    }
}

function translateToHindi() {
    document.querySelector('.hero-title').textContent = 'स्मार्ट फसल सिफारिश प्रणाली';
    document.querySelector('.hero-description').textContent = 'मिट्टी की स्थिति, मौसम पैटर्न और क्षेत्रीय डेटा के आधार पर एआई-संचालित फसल सिफारिशें प्राप्त करें';
    document.querySelector('.btn-primary').textContent = 'सिफारिश प्राप्त करें';
    document.querySelector('.btn-secondary').textContent = 'फसल डेटा देखें';
    document.querySelector('.section-title').textContent = 'फसल सिफारिश';
    document.querySelector('.section-subtitle').textContent = 'अपनी भूमि के लिए सर्वोत्तम फसल सिफारिशें प्राप्त करने के लिए अपना कृषि विवरण दर्ज करें।';
}

function translateToEnglish() {
    document.querySelector('.hero-title').textContent = 'Smart Crop Recommendation System';
    document.querySelector('.hero-description').textContent = 'Get AI-powered crop recommendations based on soil conditions, weather patterns, and regional data to maximize your agricultural yield.';
    document.querySelector('.btn-primary').textContent = 'Get Recommendation';
    document.querySelector('.btn-secondary').textContent = 'View Crop Data';
    document.querySelector('.section-title').textContent = 'Crop Recommendation';
    document.querySelector('.section-subtitle').textContent = 'Enter your agricultural details to get the best crop recommendations for your land.';
}

function initFormFunctionality() {
    // Range and number input synchronization
    const rangeInputs = document.querySelectorAll('.range-input');
    rangeInputs.forEach(range => {
        const numberInput = document.getElementById(range.id.replace('-range', ''));
        
        if (numberInput) {
            range.addEventListener('input', function() {
                numberInput.value = this.value;
            });
            
            numberInput.addEventListener('input', function() {
                range.value = this.value;
            });
        }
    });

    // Form submission
    const cropForm = document.getElementById('crop-form');
    
    if (cropForm) {
        cropForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitCropForm();
        });
    }

    // Reset form
    const resetBtn = document.getElementById('reset-form');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetForm();
        });
    }

    // Close result
    const closeResult = document.getElementById('close-result');
    const resultContainer = document.getElementById('result');
    if (closeResult && resultContainer) {
        closeResult.addEventListener('click', function() {
            resultContainer.classList.add('hidden');
        });
    }
    
    // Add sample data buttons
    addSampleDataButtons();
}

function addSampleDataButtons() {
    const formActions = document.querySelector('.form-actions');
    if (!formActions) return;
    
    const sampleDropdown = document.createElement('select');
    sampleDropdown.className = 'btn btn-secondary';
    sampleDropdown.style.marginRight = '10px';
    sampleDropdown.style.padding = '12px 20px';
    sampleDropdown.innerHTML = `
        <option value="">📋 Load Sample Data</option>
        <option value="rice">🌾 Rice (from dataset)</option>
        <option value="maize">🌽 Maize (from dataset)</option>
        <option value="wheat">🌾 Wheat</option>
        <option value="cotton">👕 Cotton</option>
    `;
    
    sampleDropdown.addEventListener('change', function(e) {
        const value = e.target.value;
        if (value && SAMPLE_DATA[value]) {
            loadSampleData(SAMPLE_DATA[value]);
            showNotification(`✅ Loaded ${SAMPLE_DATA[value].name}`, 'success');
        }
        this.value = '';
    });
    
    formActions.insertBefore(sampleDropdown, formActions.firstChild);
}

function loadSampleData(sample) {
    document.getElementById('nitrogen').value = sample.N;
    document.getElementById('nitrogen-range').value = sample.N;
    document.getElementById('phosphorus').value = sample.P;
    document.getElementById('phosphorus-range').value = sample.P;
    document.getElementById('potassium').value = sample.K;
    document.getElementById('potassium-range').value = sample.K;
    document.getElementById('temperature').value = sample.temperature;
    document.getElementById('temperature-range').value = sample.temperature;
    document.getElementById('humidity').value = sample.humidity;
    document.getElementById('humidity-range').value = sample.humidity;
    document.getElementById('ph').value = sample.ph;
    document.getElementById('ph-range').value = sample.ph;
    document.getElementById('rainfall').value = sample.rainfall;
    document.getElementById('rainfall-range').value = sample.rainfall;
    document.getElementById('soil-type').value = sample.soil_type;
}

function initWeatherFunctionality() {
    const fetchWeatherBtn = document.getElementById('fetch-weather');
    const applyWeatherBtn = document.getElementById('apply-weather');
    const cityInput = document.getElementById('city-input');
    
    if (fetchWeatherBtn) {
        fetchWeatherBtn.addEventListener('click', async function() {
            await fetchWeatherData();
        });
    }
    
    if (applyWeatherBtn) {
        applyWeatherBtn.addEventListener('click', function() {
            applyWeatherToForm();
        });
    }
    
    if (cityInput) {
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                fetchWeatherData();
            }
        });
        cityInput.placeholder = 'e.g., Mumbai, Delhi, Bangalore';
    }
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Weather Functions
async function fetchWeatherData() {
    const cityInput = document.getElementById('city-input');
    const fetchWeatherBtn = document.getElementById('fetch-weather');
    const weatherDisplay = document.getElementById('weather-display');
    
    const cityName = cityInput.value.trim();
    if (!cityName) {
        showNotification('Please enter a city name', 'error');
        return;
    }
    
    const originalText = fetchWeatherBtn.innerHTML;
    fetchWeatherBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';
    fetchWeatherBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(cityName)}`);
        const data = await response.json();
        
        if (data.success) {
            const weather = data.weather;
            
            document.getElementById('weather-temp').textContent = `${weather.temperature}°C`;
            document.getElementById('weather-humidity').textContent = `${weather.humidity}%`;
            document.getElementById('weather-rainfall').textContent = `${weather.precipitation}mm`;
            document.getElementById('weather-condition').textContent = weather.condition;
            
            // Add weather icon
            let weatherIcon = document.getElementById('weather-icon');
            if (!weatherIcon) {
                weatherIcon = document.createElement('img');
                weatherIcon.id = 'weather-icon';
                weatherIcon.style.width = '50px';
                weatherIcon.style.height = '50px';
                const weatherInfo = document.querySelector('.weather-info');
                if (weatherInfo) {
                    weatherInfo.prepend(weatherIcon);
                }
            }
            if (weather.icon) {
                weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
            }
            
            // Add weather advice
            let weatherAdvice = document.getElementById('weather-advice');
            if (!weatherAdvice) {
                weatherAdvice = document.createElement('div');
                weatherAdvice.id = 'weather-advice';
                weatherAdvice.className = 'weather-advice';
                weatherDisplay.appendChild(weatherAdvice);
            }
            
            weatherAdvice.innerHTML = `<i class="fas fa-info-circle"></i> ${weather.advice}`;
            
            weatherDisplay.classList.remove('hidden');
            showNotification(`✅ Weather data for ${cityName} loaded`, 'success');
        } else {
            showNotification(data.error || 'Could not fetch weather data', 'error');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showNotification('Error fetching weather data. Please try again.', 'error');
    } finally {
        fetchWeatherBtn.innerHTML = originalText;
        fetchWeatherBtn.disabled = false;
    }
}

function applyWeatherToForm() {
    const temp = document.getElementById('weather-temp').textContent.replace('°C', '');
    const humidity = document.getElementById('weather-humidity').textContent.replace('%', '');
    const rainfall = document.getElementById('weather-rainfall').textContent.replace('mm', '');
    
    if (temp !== '--') {
        document.getElementById('temperature').value = parseFloat(temp);
        document.getElementById('temperature-range').value = parseFloat(temp);
    }
    
    if (humidity !== '--') {
        document.getElementById('humidity').value = parseFloat(humidity);
        document.getElementById('humidity-range').value = parseFloat(humidity);
    }
    
    if (rainfall !== '--') {
        document.getElementById('rainfall').value = parseFloat(rainfall);
        document.getElementById('rainfall-range').value = parseFloat(rainfall);
    }
    
    showNotification('✅ Weather data applied to form', 'success');
}

// Form Submission
async function submitCropForm() {
    const cropForm = document.getElementById('crop-form');
    const resultContainer = document.getElementById('result');
    const submitBtn = cropForm.querySelector('button[type="submit"]');
    
    // Get form values - they should already be filled by default
    const formData = {
        N: document.getElementById('nitrogen').value,
        P: document.getElementById('phosphorus').value,
        K: document.getElementById('potassium').value,
        temperature: document.getElementById('temperature').value,
        humidity: document.getElementById('humidity').value,
        ph: document.getElementById('ph').value,
        rainfall: document.getElementById('rainfall').value,
        soil_type: document.getElementById('soil-type').value
    };
    
    // Check if any field is empty and fill with defaults if needed
    let missingFields = [];
    for (const [key, value] of Object.entries(formData)) {
        if (!value || value === '') {
            missingFields.push(key);
        }
    }
    
    if (missingFields.length > 0) {
        console.log('Missing fields, setting defaults:', missingFields);
        setDefaultFormValues();
        // Retry with default values
        return submitCropForm();
    }
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    submitBtn.disabled = true;
    
    try {
        console.log('Sending data to backend:', formData);
        
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received response:', data);
        
        if (data.success) {
            updateRecommendationResults(data);
            
            await analyzeSoilHealth(formData);
            
            resultContainer.classList.remove('hidden');
            resultContainer.scrollIntoView({ behavior: 'smooth' });
            showNotification('✅ Crop recommendations generated!', 'success');
        } else {
            showNotification('❌ Error: ' + (data.error || 'Unknown error occurred'), 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('❌ Error connecting to server. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function analyzeSoilHealth(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/soil-health`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('soil-score').textContent = data.overall;
            document.getElementById('soil-category').textContent = data.category;
            document.getElementById('soil-n').textContent = data.parameters.nitrogen + '%';
            document.getElementById('soil-p').textContent = data.parameters.phosphorus + '%';
            document.getElementById('soil-k').textContent = data.parameters.potassium + '%';
            document.getElementById('soil-ph').textContent = data.parameters.ph + '%';
            
            // Add soil interpretation
            let soilInterpretation = document.getElementById('soil-interpretation');
            if (!soilInterpretation) {
                const soilCard = document.querySelector('.soil-health-card');
                if (soilCard) {
                    soilInterpretation = document.createElement('div');
                    soilInterpretation.id = 'soil-interpretation';
                    soilInterpretation.className = 'soil-interpretation';
                    soilCard.appendChild(soilInterpretation);
                }
            }
            
            if (soilInterpretation && data.interpretation) {
                soilInterpretation.innerHTML = `
                    <h5>🌱 Soil Health Analysis:</h5>
                    <p><strong>🌿 Nitrogen (${data.interpretation.nitrogen.value}):</strong> ${data.interpretation.nitrogen.advice}</p>
                    <p><strong>🌱 Phosphorus (${data.interpretation.phosphorus.value}):</strong> ${data.interpretation.phosphorus.advice}</p>
                    <p><strong>🍂 Potassium (${data.interpretation.potassium.value}):</strong> ${data.interpretation.potassium.advice}</p>
                    <p><strong>🧪 pH Level (${data.interpretation.ph.value}):</strong> ${data.interpretation.ph.advice}</p>
                `;
            }
        }
    } catch (error) {
        console.error('Soil analysis error:', error);
    }
}

function updateRecommendationResults(data) {
    const primary = data.recommendations[0];
    const secondary = data.recommendations[1] || null;
    const tertiary = data.recommendations[2] || null;
    
    // Update primary recommendation
    document.getElementById('primary-prob').textContent = `${primary.confidence}%`;
    document.getElementById('primary-crop').textContent = formatCropName(primary.crop);
    document.getElementById('primary-season').textContent = primary.growing_season || 'Variable';
    
    // Update optimal conditions
    document.getElementById('optimal-crop').textContent = formatCropName(primary.crop);
    document.getElementById('optimal-temp').textContent = 
        primary.avg_temperature ? `${Math.round(primary.avg_temperature - 5)}-${Math.round(primary.avg_temperature + 5)}°C` : '20-30°C';
    document.getElementById('optimal-rain').textContent = 
        primary.avg_rainfall ? `${Math.round(primary.avg_rainfall - 50)}-${Math.round(primary.avg_rainfall + 50)}mm` : '500-800mm';
    document.getElementById('optimal-ph').textContent = 
        primary.avg_ph ? `${(primary.avg_ph - 0.5).toFixed(1)}-${(primary.avg_ph + 0.5).toFixed(1)}` : '6.0-7.0';
    document.getElementById('optimal-soil').textContent = primary.soil_types ? primary.soil_types[0] : 'Loamy Soil';
    
    // Update secondary recommendation
    if (secondary) {
        document.getElementById('secondary-prob').textContent = `${secondary.confidence}%`;
        document.getElementById('secondary-crop').textContent = formatCropName(secondary.crop);
        document.getElementById('secondary-season').textContent = secondary.growing_season || 'Variable';
    }
    
    // Update tertiary recommendation
    if (tertiary) {
        document.getElementById('tertiary-prob').textContent = `${tertiary.confidence}%`;
        document.getElementById('tertiary-crop').textContent = formatCropName(tertiary.crop);
        document.getElementById('tertiary-season').textContent = tertiary.growing_season || 'Variable';
    }
    
    // Add detailed crop information
    addCropDetails(primary);
}

function addCropDetails(crop) {
    const cropDetails = document.querySelector('.crop-details');
    if (!cropDetails) return;
    
    let detailsDiv = document.getElementById('extended-crop-details');
    if (!detailsDiv) {
        detailsDiv = document.createElement('div');
        detailsDiv.id = 'extended-crop-details';
        detailsDiv.className = 'extended-crop-details';
        cropDetails.appendChild(detailsDiv);
    }
    
    const soilTypes = crop.soil_types ? crop.soil_types.join(', ') : 'Loamy Soil';
    const states = crop.states ? crop.states.join(', ') : 'Various states';
    
    detailsDiv.innerHTML = `
        <h5>🌾 Detailed Analysis for ${formatCropName(crop.crop)}:</h5>
        <p><strong>📊 Confidence:</strong> ${crop.confidence}%</p>
        <p><strong>📅 Growing Season:</strong> ${crop.growing_season || 'Variable'}</p>
        <p><strong>💧 Water Requirement:</strong> ${crop.water_requirement || 'Medium'}</p>
        <p><strong>⏰ Crop Duration:</strong> ${crop.duration || '90-120 days'}</p>
        <p><strong>🌱 Suitable Soil Types:</strong> ${soilTypes}</p>
        <p><strong>📍 Major Growing States:</strong> ${states}</p>
        <p><strong>🌡️ Optimal Temperature:</strong> ${crop.avg_temperature ? Math.round(crop.avg_temperature) : '25'}°C</p>
        <p><strong>💧 Optimal Rainfall:</strong> ${crop.avg_rainfall ? Math.round(crop.avg_rainfall) : '150'}mm</p>
        <p><strong>🧪 Optimal pH:</strong> ${crop.avg_ph ? crop.avg_ph.toFixed(1) : '6.5'}</p>
    `;
}

function formatCropName(cropName) {
    return cropName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

function resetForm() {
    setDefaultFormValues();
    
    const resultContainer = document.getElementById('result');
    const weatherDisplay = document.getElementById('weather-display');
    
    if (resultContainer) resultContainer.classList.add('hidden');
    if (weatherDisplay) weatherDisplay.classList.add('hidden');
    
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) weatherIcon.remove();
    
    showNotification('✅ Form reset to default values', 'info');
}

// Crop Data Functions
async function loadCropsData() {
    const container = document.getElementById('crops-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading crop database...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/crops`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.crops && data.crops.length > 0) {
            displayCropsData(data.crops);
        }
    } catch (error) {
        console.error('Error loading crops:', error);
        container.innerHTML = '<div class="error-message">Failed to load crop data</div>';
    }
}

async function displayCropsData(crops) {
    const container = document.getElementById('crops-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Display first 12 crops
    const displayCrops = crops.slice(0, 12);
    
    for (const cropName of displayCrops) {
        try {
            const response = await fetch(`${API_BASE_URL}/crop-info/${encodeURIComponent(cropName.toLowerCase())}`);
            if (response.ok) {
                const data = await response.json();
                const card = createCropCard(cropName, data);
                container.appendChild(card);
            }
        } catch (error) {
            console.error(`Error loading details for ${cropName}:`, error);
        }
    }
}

function createCropCard(cropName, cropInfo) {
    const card = document.createElement('div');
    card.className = 'crop-data-card';
    card.setAttribute('data-crop-name', cropName.toLowerCase());
    
    const name = cropInfo.name || formatCropName(cropName);
    const icon = cropInfo.icon || 'fa-seedling';
    const season = cropInfo.growing_season || 'Variable';
    const soilTypes = cropInfo.soil_types ? cropInfo.soil_types.join(', ') : 'Loamy Soil';
    const tempRange = cropInfo.avg_temperature ? 
        `${Math.round(cropInfo.avg_temperature - 5)}-${Math.round(cropInfo.avg_temperature + 5)}°C` : 
        '20-30°C';
    const rainfallRange = cropInfo.avg_rainfall ? 
        `${Math.round(cropInfo.avg_rainfall - 50)}-${Math.round(cropInfo.avg_rainfall + 50)}mm` : 
        '500-800mm';
    const phRange = cropInfo.avg_ph ? 
        `${(cropInfo.avg_ph - 0.5).toFixed(1)}-${(cropInfo.avg_ph + 0.5).toFixed(1)}` : 
        '6.0-7.0';
    const waterReq = cropInfo.water_requirement || 'Medium';
    const duration = cropInfo.duration || '90-120 days';
    
    card.innerHTML = `
        <div class="crop-data-header">
            <i class="fas ${icon}"></i>
            <h3>${name}</h3>
        </div>
        <div class="crop-data-body">
            <div class="data-item">
                <span class="data-label"><i class="fas fa-calendar"></i> Season:</span>
                <span class="data-value">${season}</span>
            </div>
            <div class="data-item">
                <span class="data-label"><i class="fas fa-temperature-half"></i> Temperature:</span>
                <span class="data-value">${tempRange}</span>
            </div>
            <div class="data-item">
                <span class="data-label"><i class="fas fa-cloud-rain"></i> Rainfall:</span>
                <span class="data-value">${rainfallRange}</span>
            </div>
            <div class="data-item">
                <span class="data-label"><i class="fas fa-flask"></i> Soil pH:</span>
                <span class="data-value">${phRange}</span>
            </div>
            <div class="data-item">
                <span class="data-label"><i class="fas fa-mountain"></i> Soil Types:</span>
                <span class="data-value">${soilTypes}</span>
            </div>
            <div class="data-item">
                <span class="data-label"><i class="fas fa-tint"></i> Water Need:</span>
                <span class="data-value">${waterReq}</span>
            </div>
            <div class="data-item">
                <span class="data-label"><i class="fas fa-clock"></i> Duration:</span>
                <span class="data-value">${duration}</span>
            </div>
        </div>
    `;
    
    return card;
}

function initCropSearch() {
    const cropSearch = document.getElementById('crop-search');
    const seasonFilter = document.getElementById('season-filter');
    const soilFilter = document.getElementById('soil-filter');
    
    if (cropSearch) {
        cropSearch.addEventListener('input', filterCrops);
    }
    
    if (seasonFilter) {
        seasonFilter.addEventListener('change', filterCrops);
    }
    
    if (soilFilter) {
        soilFilter.addEventListener('change', filterCrops);
    }
}

function filterCrops() {
    const searchTerm = document.getElementById('crop-search')?.value.toLowerCase() || '';
    const seasonFilter = document.getElementById('season-filter')?.value.toLowerCase() || '';
    const soilFilter = document.getElementById('soil-filter')?.value.toLowerCase() || '';
    
    const cropCards = document.querySelectorAll('.crop-data-card');
    let visibleCount = 0;
    
    cropCards.forEach(card => {
        const cropName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const season = card.querySelector('.data-item:nth-child(1) .data-value')?.textContent.toLowerCase() || '';
        const soil = card.querySelector('.data-item:nth-child(5) .data-value')?.textContent.toLowerCase() || '';
        
        const nameMatch = !searchTerm || cropName.includes(searchTerm);
        const seasonMatch = !seasonFilter || season.includes(seasonFilter);
        const soilMatch = !soilFilter || soil.includes(soilFilter);
        
        const shouldShow = nameMatch && seasonMatch && soilMatch;
        card.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) visibleCount++;
    });
    
    const container = document.getElementById('crops-container');
    const noResults = container?.querySelector('.no-results');
    
    if (visibleCount === 0 && container && !noResults) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = '<i class="fas fa-search"></i> No crops match your filters';
        noResultsDiv.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 40px; color: #666;';
        container.appendChild(noResultsDiv);
    } else if (noResults && visibleCount > 0) {
        noResults.remove();
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        z-index: 9999;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .notification.success { background: linear-gradient(135deg, #4CAF50, #45a049); }
    .notification.error { background: linear-gradient(135deg, #f44336, #d32f2f); }
    .notification.info { background: linear-gradient(135deg, #2196F3, #1976D2); }
    .notification.warning { background: linear-gradient(135deg, #ff9800, #f57c00); }
    .notification i { font-size: 20px; }
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
    }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .loading-spinner {
        grid-column: 1/-1;
        text-align: center;
        padding: 50px;
        color: #666;
    }
    .fa-spinner { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .weather-advice {
        margin-top: 15px;
        padding: 12px;
        background: rgba(255,255,255,0.2);
        border-radius: 6px;
        border-left: 3px solid #ffd700;
    }
    .soil-interpretation {
        margin-top: 20px;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 8px;
        border-left: 4px solid #4caf50;
    }
    .extended-crop-details {
        margin-top: 15px;
        padding: 15px;
        background: #e8f5e9;
        border-radius: 6px;
    }
    .hidden { display: none !important; }
`;
document.head.appendChild(style);