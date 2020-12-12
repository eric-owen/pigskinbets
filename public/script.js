require('dotenv').config()
const axios = require('axios');

async function getScores (week) {
    const response = await axios.get(`https://charlotte.rotogrinders.com/sports/nfl/events?key=${process.env.API_Key}&week=2020-reg-${week}`);
    return await response.data.data
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('week-selector').addEventListener('change', async e => {
        e.preventDefault();
        let week = document.getElementById('week-selector');
        let weekValue = week.value;
        //make an if statement so that the default "choose a week" doesn't run the getScores function
        let games = await getScores(weekValue)
        console.log(games);
    });
});