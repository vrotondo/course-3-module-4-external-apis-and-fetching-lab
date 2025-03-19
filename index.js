// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API

// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process

async function fetchWeatherData(city) {
    const apiKey = '11ca5bc346a77d53d4dc1277552ae50f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const errorMessage = document.getElementById('error-message');

    if (weatherDisplay) {
        // Calculate temperature in Celsius from Kelvin
        const temperature = Math.round((data.main.temp - 273.15));

        weatherDisplay.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Description: ${data.weather[0].description}</p>
        `;
    }

    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    const weatherDisplay = document.getElementById('weather-display');

    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    if (weatherDisplay) {
        weatherDisplay.innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-weather');
    const cityInput = document.getElementById('city-input');

    if (!fetchButton || !cityInput) {
        console.error('Required DOM elements not found.');
        return;
    }

    fetchButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();

        if (city) {
            try {
                const data = await fetchWeatherData(city);
                displayWeather(data);
            } catch (error) {
                displayError(error.message);
            }
        } else {
            displayError('Please enter a city name.');
        }
    });
});

module.exports = { fetchWeatherData, displayWeather, displayError };
