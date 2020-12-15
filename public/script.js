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

        // selects the page div and resets the html to prevent duplicate rendering
        const betClass = document.querySelector('.bets-list')
        betClass.innerHTML = ''


        try {
            games.forEach(game => {

                // creates and appends each indiividual bet div
                const createDiv = document.createElement('div')
                createDiv.classList.add('indiv-bet')
                betClass.appendChild(createDiv)

                // sets the value of away and home scores to prevent null values
                const awayScore = (game.away.score === null) ? 'TBD' : game.away.score
                const homeScore = (game.home.score === null) ? 'TBD' : game.home.score

                // checks for which team is favored to assign the correct spread value
                let spreadAway
                let spreadHome
                if (game.odds.current.spread.favorite === 'away') {
                    spreadAway = game.odds.current.spread.value * -1
                    spreadHome = `+${game.odds.current.spread.value}`
                } else {
                    spreadAway = `+${game.odds.current.spread.value}`
                    spreadHome = game.odds.current.spread.value * -1
                }

                // assigns a value to possession if this Object key exists for the current game
                const possession = (game.status.possession) ? `${game.status.possession}'s ball` : game.state

                // renders html to the page
                createDiv.innerHTML = `
                    
                        <div class="updates">
                            <span>${possession}, ${game.status.state}</span>
                        </div>
                        <div class="indiv">
                        <div class="away">
                            <span class="score">${awayScore}</span>
                            <span class="team away-team">${game.away.mascot}</span>
                            <button value="Spread" type="button" class="odds-button" odds=${game.odds.current.spread.away}>${spreadAway} (${game.odds.current.spread.away})</button>
                            <button value="Moneyline" type="button" class="odds-button" odds=${game.odds.current.moneyline.away}>${game.odds.current.moneyline.away}</button>
                            <button value="Total" bet-type="Over" type="button" class="odds-button" odds=${game.odds.current.total.over}>O${game.odds.current.total.value} (${game.odds.current.total.over})</button>
                        </div>
                        <div class="home">
                            <span class="score">${homeScore}</span>
                            <span class="team home-team">${game.home.mascot}</span>
                            <button value="Spread" type="button" class="odds-button" odds=${game.odds.current.spread.home}>${spreadHome} (${game.odds.current.spread.home})</button>
                            <button value="Moneyline" type="button" class="odds-button" odds=${game.odds.current.moneyline.home}>${game.odds.current.moneyline.home}</button>
                            <button value="Total" bet-type="Under" type="button" class="odds-button" odds=${game.odds.current.total.under}>U${game.odds.current.total.value} (${game.odds.current.total.under})</button>
                        </div>
                    </div>
                    
                `
            })
        } catch (err) {
            betClass.innerHTML = `no odds generated ---- ${err}`
            console.log(games)
        }

        // selecting specific bets 

        // loops through all the odds buttons on the page
        for (bet of document.getElementsByClassName('odds-button')) {
            bet.addEventListener('click', e => {

                //selectors
                const betAttributesEl = e.target.parentElement
                const selectedBetEl = document.querySelector('.selected-bet')

                // variables to extract information depending on specific user selection 
                const currentAwayTeam = betAttributesEl.parentElement.querySelector('.away-team').innerText
                const currentHomeTeam = betAttributesEl.parentElement.querySelector('.home-team').innerText
                const betOdds = e.currentTarget.getAttribute('odds')
                const betType = e.currentTarget.value
                const betTeam = (betType === 'Total') ? e.currentTarget.getAttribute('bet-type') : betAttributesEl.querySelector('.team').innerText

                // render html to the bet slip 
                selectedBetEl.innerHTML = `
                
                    <p class="bet-info">${betTeam} ${betType} ${betOdds}</p>
                    
                    <p> ${currentAwayTeam} at ${currentHomeTeam}</p>
                    <p class="bet-money ">Risk: <input type="number" class="risk"></p>
                    <p class="bet-money ">Potential winnings: <span class="winnings">0</span></p>
                    <button type="button">Submit Bet</button>
                    <button type="button" class="remove">Remove Bet</button>
                
                `

                // adds functionality to the remove button
                document.querySelector('.remove').addEventListener('click', (e) => {
                    selectedBetEl.innerHTML = '<em>Please select a bet</em>'
                })

                // betting math logic depending on user input 
                document.querySelector('.risk').addEventListener('input', e => {
                    let multiplier = Number(betOdds) / 100
                    let input = Number(e.target.value)
                    let winnings = (betOdds > 0) ? multiplier * input : (input / multiplier) * -1

                    // renders calculated winnings to screen
                    document.querySelector('.winnings').innerHTML = winnings.toFixed(2)

                })

            })
        }

    });
});