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



        games.forEach(game => {

            // creates and appends each indiividual bet div
            const createDiv = document.createElement('div')
            createDiv.classList.add('indiv-bet')
            betClass.appendChild(createDiv)

            //checks for null values for each object value and assigns it to a variable
            const awayScore = (!game.away.score) ? 'TBD' : game.away.score
            const homeScore = (!game.home.score) ? 'TBD' : game.home.score
            const awayMl = (!game.odds.current.moneyline) ? 'TBD' : game.odds.current.moneyline.away
            const homeMl = (!game.odds.current.moneyline) ? 'TBD' : game.odds.current.moneyline.home
            const currentOver = (!game.odds.current.total) ? 'TBD' : game.odds.current.total.over
            const currentUnder = (!game.odds.current.total) ? 'TBD' : game.odds.current.total.under
            const totalValue = (!game.odds.current.total) ? 'TBD' : game.odds.current.total.value
            const spreadOddsAway = (!game.odds.current.spread) ? 'TBD' : game.odds.current.spread.away
            const spreadOddsHome = (!game.odds.current.spread) ? 'TBD' : game.odds.current.spread.home

            // checks for which team is favored to assign the correct spread value
            let checkFav = (!game.odds.current.spread) ? null : game.odds.current.spread.favorite
            let spreadAwayFav
            let spreadHomeFav
            if (checkFav === 'away') {
                spreadAwayFav = game.odds.current.spread.value * -1
                spreadHomeFav = `+${game.odds.current.spread.value}`
            } else if (checkFav === 'home') {
                spreadAwayFav = `+${game.odds.current.spread.value}`
                spreadHomeFav = game.odds.current.spread.value * -1
            } else {
                spreadAwayFav = 'TBD'
                spreadHomeFav = 'TBD'
            }


            // assigns a value to possession if this Object key exists for the current game
            const possession = (game.status.possession) ? `${game.status.possession}'s ball` : game.state

            // renders html to the page


            createDiv.innerHTML = `
                    
                <div class="updates">
                    <span class="status">${possession}</span> <span>${game.status.state}</span>
                </div>
                <div class="indiv">
                <div class="away">
                    <span class="score">${awayScore}</span>
                    <span class="team away-team">${game.away.mascot}</span>
                    <button value="Spread" type="button" class="odds-button" odds=${spreadOddsAway}>${spreadAwayFav} (${spreadOddsAway})</button>
                    <button value="Moneyline" type="button" class="odds-button" odds=${awayMl}>${awayMl}</button>
                    <button value="Total" bet-type="Over" type="button" class="odds-button" odds=${currentOver}>O${totalValue} (${currentOver})</button>
                </div>
                <div class="home">
                    <span class="score">${homeScore}</span>
                    <span class="team home-team">${game.home.mascot}</span>
                    <button value="Spread" type="button" class="odds-button" odds=${spreadOddsHome}>${spreadHomeFav} (${spreadOddsHome})</button>
                    <button value="Moneyline" type="button" class="odds-button" odds=${homeMl}>${homeMl}</button>
                    <button value="Total" bet-type="Under" type="button" class="odds-button" odds=${currentUnder}>U${totalValue} (${currentUnder})</button>
                </div>
            </div>
            
        `
        })


        // selecting specific bets 

        // loops through all the odds buttons on the page
        for (bet of document.getElementsByClassName('odds-button')) {
            bet.addEventListener('click', e => {

                //selectors
                const betAttributesEl = e.target.parentElement
                const selectedBetEl = document.querySelector('.selected-bet')

                // variables to extract information depending on specific user selection 
                //const status = betAttributesEl
                const currentAwayTeam = betAttributesEl.parentElement.querySelector('.away-team').innerText
                const currentHomeTeam = betAttributesEl.parentElement.querySelector('.home-team').innerText
                const betOdds = e.currentTarget.getAttribute('odds')
                const betType = e.currentTarget.value
                const betTeam = (betType === 'Total') ? e.currentTarget.getAttribute('bet-type') : betAttributesEl.querySelector('.team').innerText

                //const status = betAttributesEl.parentElement.parentElement.querySelector('status').innerText
                let status = betAttributesEl.parentElement.parentElement.querySelector('.updates').querySelector('.status').innerHTML

                // render html to the bet slip 


                selectedBetEl.innerHTML = `
                
                    <p class="bet-info">${betTeam} ${betType} ${betOdds}</p>
                    
                    <p> ${currentAwayTeam} @ ${currentHomeTeam}</p>
                    <p class="bet-money top">Risk: <input type="number" class="risk" onkeypress="return event.charCode >= 48" min="1"></p>
                    <p class="bet-money">Potential winnings: <span class="winnings">0</span></p>
                    <button class="submit" type="button">Submit Bet</button>
                    <button type="button" class="remove">Remove Bet</button>
                
                `
                // checks if bet is valid before submition
                if (betTeam === 'TBD' || betType === 'TBD' || betOdds === 'TBD' || status === 'Postgame') {
                    const button = document.querySelector('.submit')
                    button.disabled = true
                    button.innerHTML = '<em>Please select a valid bet</em>'
                }



                // adds functionality to the remove button
                document.querySelector('.remove').addEventListener('click', (e) => {
                    selectedBetEl.innerHTML = '<em>Please select a bet</em>'
                })

                // betting math logic depending on user input 
                document.querySelector('.risk').addEventListener('input', e => {
                    let multiplier = Number(betOdds) / 100
                    let input = Number(e.target.value)
                    let winnings = (betOdds > 0) ? multiplier * input : Math.abs((input / multiplier))

                    // renders calculated winnings to screen
                    document.querySelector('.winnings').innerHTML = winnings.toFixed(2)

                })

            })
        }

    });
});