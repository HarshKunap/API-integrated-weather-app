require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Enable CORS (Allows your frontend to talk to this server)
app.use(cors());

// 2. Serve your 'public' folder (HTML/CSS/JS) as static files
app.use(express.static(path.join(__dirname, 'public')));

// 3. The API Route
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const response = await axios.get(url);
        res.json(response.data); // Send the weather data back to the frontend
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// 4. Start the Server
app.listen(PORT, () => {
    console.log(`-----------------------------------------------`);
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`-----------------------------------------------`);
});