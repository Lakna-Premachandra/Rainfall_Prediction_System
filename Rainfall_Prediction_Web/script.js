document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

    const submitBtn = document.getElementById('predictBtn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('errorSection').classList.add('hidden');

    try {
        const formData = {
            day: document.getElementById('day').value ? parseFloat(document.getElementById('day').value) : '',
            pressure: document.getElementById('pressure').value ? parseFloat(document.getElementById('pressure').value) : '',
            maxtemp: document.getElementById('maxtemp').value ? parseFloat(document.getElementById('maxtemp').value) : '',
            temparature: document.getElementById('temparature').value ? parseFloat(document.getElementById('temparature').value) : '',
            mintemp: document.getElementById('mintemp').value ? parseFloat(document.getElementById('mintemp').value) : '',
            dewpoint: document.getElementById('dewpoint').value ? parseFloat(document.getElementById('dewpoint').value) : '',
            humidity: document.getElementById('humidity').value ? parseFloat(document.getElementById('humidity').value) : '',
            cloud: document.getElementById('cloud').value ? parseFloat(document.getElementById('cloud').value) : '',
            sunshine: document.getElementById('sunshine').value ? parseFloat(document.getElementById('sunshine').value) : '',
            winddirection: document.getElementById('winddirection').value ? parseFloat(document.getElementById('winddirection').value) : '',
            windspeed: document.getElementById('windspeed').value ? parseFloat(document.getElementById('windspeed').value) : ''
        };

        const apiUrl = 'http://127.0.0.1:8000/predict';
        const queryParams = new URLSearchParams(formData).toString();
        const fullUrl = `${apiUrl}?${queryParams}`;

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
            showError(result.error);
            return;
        }

        const transformedResult = {
            prediction: result.prediction.toLowerCase().includes('rainfall') ? 'rainfall' : 'no-rainfall',
            confidence: Math.round(result.confidence * 100)
        };

        showResult(transformedResult);

        document.getElementById('predictionForm').reset();

    } catch (error) {
        console.error('API Error:', error);
        showError(`Network error: ${error.message || 'Unable to connect to the server. Please try again.'}`);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

function showResult(result) {
    const resultSection = document.getElementById('resultSection');
    const predictionText = document.getElementById('predictionText');
    const predictionSubtitle = document.getElementById('predictionSubtitle');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceValue = document.getElementById('confidenceValue');

    if (result.prediction === 'rainfall') {
        predictionText.textContent = 'RAINFALL EXPECTED';
        predictionText.className = 'prediction-text rainfall';
        predictionSubtitle.textContent = 'Weather conditions indicate precipitation is likely';
    } else {
        predictionText.textContent = 'NO RAINFALL';
        predictionText.className = 'prediction-text no-rainfall';
        predictionSubtitle.textContent = 'Weather conditions indicate clear skies';
    }

    confidenceValue.textContent = result.confidence + '%';

    resultSection.classList.remove('hidden');

    setTimeout(() => {
        confidenceFill.style.width = result.confidence + '%';
    }, 100);
}

function showError(message) {
    const errorSection = document.getElementById('errorSection');
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
}

function hideError() {
    document.getElementById('errorSection').classList.add('hidden');
}

function clearData() {
    document.getElementById('predictionForm').reset();

    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
    });

    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });

    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('errorSection').classList.add('hidden');
}