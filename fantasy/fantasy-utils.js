const fantasy = require('./fantasy-api.js');
const utils = require('../utils/utils.js')

const client = fantasy.getLeagueClient();

// sort teams to get rank
function getRank(teams, id) {
    teams.sort(utils.compare);
    return teams.findIndex(obj => obj.id === id);
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
            team.rank = getRank(teams, id)
            callback({ team: team, owner: data.owner});
        });
    }

}