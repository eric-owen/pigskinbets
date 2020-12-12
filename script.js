require('dotenv').config()
const axios = require('axios');

async function getScores (week) {
    const response = await axios.get(`https://charlotte.rotogrinders.com/sports/nfl/events?key=${process.env.API_Key}&week=2020-reg-${week}`);
    return await response.data
};