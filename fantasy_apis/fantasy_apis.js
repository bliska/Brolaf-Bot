const { espn_S2, swid } = require('../config.json');

const fantasy = require('espn-fantasy-football-api');

const client = new fantasy.Client({ leagueId: 194518})

myClient.setCookies({ espnS2: espn_S2, SWID: swid });