const { teams } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    // get espn team id from discord id
    // these are stored in config file
    espnIdFromDiscord: function(id) {
        const value = id.toString()
        return teams.filter(obj => { return obj.discordId === value })[0].espnId
    },

    // get discord id from team id
    // these are stored in config file
    discordIdFromEspn: function(id) {
        return teams.filter(obj => { return obj.espnId === id })[0].discordId
    },

    // get owner from team id
    ownerFromEspn: function(id) {
        return teams.filter(obj => { return obj.espnId === id })[0].owner
    },

    // get user from mention
    getUserFromMention: function(mention) {
        if (!mention) return;

        // check format
	    if (mention.startsWith('<@') && mention.endsWith('>')) {
		    mention = mention.slice(2, -1);
            
            // remove ! if nickname
		    if (mention.startsWith('!')) {
			    mention = mention.slice(1);
		    }
            
            // return ID
		    return mention;
	    }
    },

    // compare function (used to rank teams)
    compareRank: function(a,b) {
        if(a.wins < b.wins) return 1;
        else if(a.wins > b.wins) return -1;
        else if(a.totalPointsScored < b.totalPointsScored) return 1;
        else if(a.totalPointsScored > b.totalPointsScored) return -1;
        else return 0;
    },

    // compare function (used to order regular season points for)
    comparePF: function(a,b) {
        if(a.regularSeasonPointsFor < b.regularSeasonPointsFor) return 1;
        else if(a.regularSeasonPointsFor > b.regularSeasonPointsFor) return -1;
        else return 0;
    },

    // compare function (used to order regular season points against)
    comparePA: function(a,b) {
        if(a.regularSeasonPointsAgainst < b.regularSeasonPointsAgainst) return 1;
        else if(a.regularSeasonPointsAgainst > b.regularSeasonPointsAgainst) return -1;
        else return 0;
    },

    // make ordinal from number (for rank)
    ordinal: function(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

}