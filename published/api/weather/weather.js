const apiKey = '4a1f8a61b74546825af1e0be106e797b'; // Replace with your actual API key
let city = "";
let url = "";
// Function to call the weather API with the city name
async function fetchWeatherData(url) {


    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

// Function to save JSON data in localStorage with the current date and time
function saveToLocalStorage(url, data) {
    const timestampedData = {
        data: data,
        timestamp: new Date().toLocaleString()
    };
    localStorage.setItem(url, JSON.stringify(timestampedData));
}

// Function to read data from localStorage using the URL as the key
function readFromLocalStorage(url) {
    const storedData = localStorage.getItem(url);
    return storedData ? JSON.parse(storedData) : null;
}

// Function to display data on the page
function displayWeather(data) {
    const display = document.getElementById('weatherDisplay');
    if (data.error) {
        display.innerHTML = `<p>${data.error}</p>`;
    } else {
        display.innerHTML = JSON.stringify(data);


    }
}

// Function to get weather data and handle localStorage
async function getWeather() {
    city = document.getElementById('cityInput').value.trim().toLowerCase();
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a1f8a61b74546825af1e0be106e797b&units=metric`;

    // alert(url);
    fetchWeatherData(url);
    let data = readFromLocalStorage(url);
    if (data) {
        displayWeather(data.data);
    } else {
        data = await fetchWeatherData(city);
        if (!data.error) {
            saveToLocalStorage(url, data);
        }
        displayWeather(data);
    }
}
