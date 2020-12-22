const { s2, swid } = require('../config.json');
const fantasy = require('espn-fantasy-football-api/node');

module.exports = {

    getLeagueClient: function() {
        const client = new fantasy.Client({ leagueId: 194518});
        client.setCookies({ espnS2: s2, SWID: swid });
        return client;
    }
}
