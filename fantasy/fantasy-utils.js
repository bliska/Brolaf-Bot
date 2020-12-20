const fantasy = require('./fantasy-api.js');
const utils = require('../utils/utils.js')

const client = fantasy.getLeagueClient();

// sort teams to get rank, pf, pa
function getOrder(type, teams, id) {
    if (type === 'rank') {
        teams.sort(utils.compareRank);
    } else if (type === 'pf') {
        teams.sort(utils.comparePF);
    } else if (type === 'pa') {
        teams.sort(utils.comparePA);
    } else {
        teams.sort();
    }
    return teams.findIndex(obj => obj.id === id) + 1;
}

module.exports = {
    getTeamInfo: function(data, callback) {
        const id = data.teamId
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
            callback({ team: team, owner: data.owner});
        });
    }

}