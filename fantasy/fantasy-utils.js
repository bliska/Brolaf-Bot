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

// get single box score based on team ID
function singleBox(id, boxes) {
    return boxes.filter(box => {
        return (box.homeTeamId === id || box.awayTeamId == id);
    });
}

module.exports = {
    // function to get data on all teams
    getTeamsInfo: function(data, callback) {
        // get all teams (teams is array of each team)
        client.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 18})
        .then(teams => {
            callback(teams)
        });
    },

    // function to get information on one team
    getTeamInfo: function(data, callback) {
        const id = data.teamId;
        // get all teams (teams is array)
        this.getTeamsInfo({}, teams =>{ 
            // find the team we want
            let team = teams.filter(team => {
                return team.id === id;
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
        client.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 18})
        .then(teams => {
            teamSort(type, teams);

            callback(teams);
        });
    },

    // function to get boxscores or single boxscore
    getBoxscores: function(data, callback) {
        // start with week 18 (post-season), could be a parameter in the future
        if (!data.week) {
            data.week = 18;
        };
        client.getBoxscoreForWeek({ seasonId: 2020, scoringPeriodId: data.week, matchupPeriodId: data.week})
        .then(boxes => {
            // iterate back through weeks until populated to get current week
            if (!boxes.length) {
                data.week -= 1;
                this.getBoxscores(data, callback)
                return;
            };

            // filter boxScores if needed
            if (data.id) {
                boxes = singleBox(data.id, boxes);
            };

            callback(boxes);
        });
    }

}