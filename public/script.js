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
                const createDiv = document.createElement('div')
                createDiv.classList.add('indiv-bet')
                createDiv.innerHTML = `
                
                <div class="col">
                        <p>12/10/2020</p>
                        <p>1:00 PM</p>
                    </div>
                <div class="col">
                    <p>${game.away.city} ${game.away.mascot}</p>
                    <p>${game.home.city} ${game.home.mascot}</p>
                </div>
                <div class="col">
                    <p>${game.odds.current.spread.away}</p>
                    <p>${game.odds.current.spread.home}</p>
                </div>
                <div class="col">
                    <p>${game.odds.current.moneyline.away}</p>
                    <p>${game.odds.current.moneyline.home}</p>
                </div>
                <div class="col">
                    <p>O${game.odds.current.total.value} ${game.odds.current.total.over}</p>
                    <p>U${game.odds.current.total.value} ${game.odds.current.total.under}</p>
                </div>
            </div>
            `
                betClass.appendChild(createDiv)
                console.log(game)

            })
        } catch {
            betClass.innerHTML = 'No Odds generated'
        }


    });
});