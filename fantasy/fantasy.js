//just used for testing at this point

const fantasy = require('./fantasy-api.js');


const client = fantasy.getLeagueClient();

function test(callback) {
    client.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 1})
        .then(teams => {
            var team = teams.filter(obj => {
                return obj.id === 5;
            })[0];
            callback(team);
        });
    
}

test(function(response){
    console.log(response);
});