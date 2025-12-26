const searchBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;

    // 1. Check if the input is empty
    if (!city) {
        alert('Please enter a city name! 🏙️');
        return;
    }

    try {
        resultDiv.innerHTML = 'Loading... ⏳';

        // 2. Ask YOUR backend for the weather (not OpenWeather directly!)
        // We will set up this endpoint in server.js next
        const response = await fetch(`http://localhost:3000/weather?city=${city}`);
        
        const data = await response.json();

        // 3. Check if the city was found
        if (data.cod === '404') {
            resultDiv.innerHTML = `❌ City not found. Try again.`;
            return;
        }

        // 4. Display the weather!
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        resultDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
            <h1>${temp}°C</h1>
            <p>${description.toUpperCase()}</p>
        `;

    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `❌ Something went wrong. Make sure your server is running!`;
    }
});