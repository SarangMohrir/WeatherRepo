document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()

        if (city) return;
        
        try {
            const weatherData = await fetchWeatherData(city)
        } catch(error) {
            showError(error)
        }

    })

    async function fetchWeatherData(city) {
        // gets the data
        const url = `https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current_weather=true
        `
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        return await response.json();
    }
    async function displayWeatherData(weatherData) {
        cityNameDisplay.textContent = weatherData.name;
        temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
        descriptionDisplay.textContent = `Condition: ${weatherData.weather[0].description}`;
        errorMessage.textContent = ""; // Clear error message if any
    }
    function showError(error) {
        //show the error
        errorMessage.textContent = error.message;
    }
})