const fantasy = require('./fantasy-api.js');


const client = fantasy.getLeagueClient();

module.exports = {
    getTeamInfo: function(data, callback) {
        const id = data.teamId
        client.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 1})
        .then(teams => {
            let team = teams.filter(obj => {
                return obj.id === 5;
            })[0];
            
            callback({ team: team, owner: data.owner});
        });
    }

}