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
    }

}