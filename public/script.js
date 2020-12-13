const API_Key = config.API_Key

async function getScores(week) {
    const response = await axios.get(`https://charlotte.rotogrinders.com/sports/nfl/events?key=${API_Key}&week=2020-reg-${week}`);
    return await response.data.data;
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('week-selector').value = "default";
    document.getElementById('week-selector').addEventListener('change', async e => {
        e.preventDefault();
        let week = document.getElementById('week-selector');
        let weekValue = week.value;
        let games = await getScores(weekValue);

        const betClass = document.querySelector('.bets-list')
        betClass.innerHTML = ''

        try {
            games.forEach(game => {
                console.log(game)

                // creates and appends each indiividual bet div
                const createDiv = document.createElement('div')
                createDiv.classList.add('indiv-bet')
                betClass.appendChild(createDiv)

                // sets the value of away and home scores to prevent null values
                let awayScore = (game.away.score === null) ? '' : game.away.score
                let homeScore = (game.home.score === null) ? '' : game.home.score

                // checks for which team is favored to assign the correct spread value
                let spreadAway
                let spreadHome
                if (game.odds.current.spread.favorite === 'away') {
                    spreadAway = game.odds.current.spread.value * -1
                    spreadHome = game.odds.current.spread.value
                } else {
                    spreadAway = game.odds.current.spread.value
                    spreadHome = game.odds.current.spread.value * -1
                }

                // assigns a value to poesession if the Object key exists for the current game
                let possession = (game.status.possession) ? `${game.status.possession}'s ball` : ''

                // renders html to the page
                createDiv.innerHTML = `
                    <div class="col">
                            <p>${possession}</p>
                            <p>${game.status.state}</p>
                    </div>
                    <div class="col">
                            <p>${awayScore}</p>
                            <p>${homeScore}</p>
                    </div>
                    <div class="col">
                        <p>${game.away.city} ${game.away.mascot}</p>
                        <p>${game.home.city} ${game.home.mascot}</p>
                    </div>
                    <div class="col">
                        <p>${spreadAway} (${game.odds.current.spread.away})</p>
                        <p>${spreadHome} (${game.odds.current.spread.home})</p>
                    </div>
                    <div class="col">
                        <p>${game.odds.current.moneyline.away}</p>
                        <p>${game.odds.current.moneyline.home}</p>
                    </div>
                    <div class="col">
                        <p>O${game.odds.current.total.value} (${game.odds.current.total.over})</p>
                        <p>U${game.odds.current.total.value} (${game.odds.current.total.under})</p>
                    </div>           
                    `
            })
        } catch (err) {
            betClass.innerHTML = `no odds generated ---- ${err}`
        }


    });
});