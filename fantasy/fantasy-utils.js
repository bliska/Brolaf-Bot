const fantasy = require('./fantasy-api.js');
const utils = require('../utils/utils.js')

const client = fantasy.getLeagueClient();

// get rank after sort
function getOrder(type, teams, id) {
    teamSort(type, teams);
    return teams.findIndex(obj => obj.id === id) + 1;
}

// sort teams based on rank, pf, pa
function teamSort(type, teams) {
    if (type === 'rank') {
        teams.sort(utils.compareRank);
    } else if (type === 'pf') {
        teams.sort(utils.comparePF);
    } else if (type === 'pa') {
        teams.sort(utils.comparePA);
    } else {
        teams.sort();
    }
    return teams;
}

module.exports = {
    // function to get information on one team
    getTeamInfo: function(data, callback) {
        const id = data.teamId;
        // get all teams (teams is array)
        client.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 1})
        .then(teams => {
            
            // find the team we want
            let team = teams.filter(obj => {
                return obj.id === id;
            })[0];
            
            // add rank
            team.rank = getOrder('rank', teams, id);
            team.pfRank = getOrder('pf', teams, id);
            team.paRank = getOrder('pa', teams, id);
            team.owner = data.owner;
            callback(team);
        });
    },

    // function to get standings
    getStandings: function(data, callback) {
        const type = data.type;
        // get all teams and sort
        client.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 1})
        .then(teams => {
            teamSort(type, teams);

            callback({ teams: teams, type: type });
        });
    }

}