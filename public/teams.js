const teams = [
    {
        "name": "Cardinals",
        "colors": {
            "primary": "#97233f",
            "secondary": "#000000"
        }
    },

    {
        "name": "Falcons",
        "colors": {
            "primary": "#a6192e",
            "secondary": "#000000"
        }
    },

    {
        "name": "Ravens",
        "colors": {
            "primary": "#251c71",
            "secondary": "#000000"
        }
    },

    {
        "name": "Bills",
        "colors": {
            "primary": "#00338d",
            "secondary": "#c60c30"
        }
    },

    {
        "name": "Panthers",
        "colors": {
            "primary": "#0085ca",
            "secondary": "#000000"
        }
    },

    {
        "name": "Bears",
        "colors": {
            "primary": "#0b162a",
            "secondary": "#c83803"
        }
    },

    {
        "name": "Bengals",
        "colors": {
            "primary": "#fb4f14",
            "secondary": "#000000"
        }
    },

    {
        "name": "Browns",
        "colors": {
            "primary": "#ff3c00",
            "secondary": "#311d00"
        }
    },

    {
        "name": "Cowboys",
        "colors": {
            "primary": "#869397",
            "secondary": "#041e42"
        }
    },

    {
        "name": "Broncos",
        "colors": {
            "primary": "#fb4f14",
            "secondary": "#002244"
        }
    },

    {
        "name": "Lions",
        "colors": {
            "primary": "#0076b6",
            "secondary": "#b0b7bc"
        }
    },

    {
        "name": "Packers",
        "colors": {
            "primary": "#203731",
            "secondary": "#ffb612"
        }
    },

    {
        "name": "Texans",
        "colors": {
            "primary": "#03202f",
            "secondary": "#a71930"
        }
    },

    {
        "name": "Colts",
        "colors": {
            "primary": "#003a70",
            "secondary": "#a2aaad"
        }
    },

    {
        "name": "Jaguars",
        "colors": {
            "primary": "#006778",
            "secondary": "#d7a22a"
        }
    },

    {
        "name": "Chiefs",
        "colors": {
            "primary": "#e31837",
            "secondary": "#ffb81c"
        }
    },

    {
        "name": "Raiders",
        "colors": {
            "primary": "#777777",
            "secondary": "#000000"
        }
    },
    
    {
        "name": "Chargers",
        "colors": {
            "primary": "#0e243f",
            "secondary": "#ffc20e"
        }
    },

    {
        "name": "Rams",
        "colors": {
            "primary": "#0b215e",
            "secondary": "#fece0c"
        }
    },
    
    {
        "name": "Dolphins",
        "colors": {
            "primary": "#008e97",
            "secondary": "#f26a24"
        }
    },

    {
        "name": "Vikings",
        "colors": {
            "primary": "#4f2683",
            "secondary": "#ffb81c"
        }
    },

    {
        "name": "Patriots",
        "colors": {
            "primary": "#002244",
            "secondary": "#c60c30"
        }
    },
    
    {
        "name": "Saints",
        "colors": {
            "primary": "#d3bc8d",
            "secondary": "#101820"
        }
    },

    {
        "name": "Giants",
        "colors": {
            "primary": "#0b2265",
            "secondary": "#a71930"
        }
    },

    {
        "name": "Jets",
        "colors": {
            "primary": "#046a38",
            "secondary": "#999999"
        }
    },

    {
        "name": "Eagles",
        "colors": {
            "primary": "#064850",
            "secondary": "#70808f"
        }
    },

    {
        "name": "Steelers",
        "colors": {
            "primary": "#000000",
            "secondary": "#fdb735"
        }
    },

    {
        "name": "49ers",
        "colors": {
            "primary": "#aa0000",
            "secondary": "#b3995d"
        }
    },

    {
        "name": "Seahawks",
        "colors": {
            "primary": "#69be28",
            "secondary": "#002244"
        }
    },

    {
        "name": "Buccaneers",
        "colors": {
            "primary": "#d50a0a",
            "secondary": "#ff7900"
        }
    },

    {
        "name": "Titans",
        "colors": {
            "primary": "#002a5c",
            "secondary": "#4495d1"
        }
    },

    {
        "name": "Football Team",
        "colors": {
            "primary": "#842835",
            "secondary": "#ffcd00"
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fav-team-selector').value = "default";
    document.getElementById('fav-team-selector').addEventListener('change', () => {
        let favoriteTeam = document.getElementById('fav-team-selector');
        let favoriteTeamValue = favoriteTeam.value;
        let teamData = teams.find((favTeam) => {
            return favoriteTeamValue === favTeam.name;
        });
        let teamColors = teamData.colors;
        document.querySelector('.topnav').style.backgroundColor = teamColors.primary;
        document.querySelector('a').style.backgroundColor = teamColors.secondary;
        document.querySelectorAll('a.options').forEach((option) => {
            option.style.backgroundColor = teamColors.primary;
        });
    });
});