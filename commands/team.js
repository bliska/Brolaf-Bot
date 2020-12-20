const { prefix } = require('../config.json');
const utils = require('../utils/utils.js');
const fantasy = require('../fantasy/fantasy-utils.js');
const Discord = require('discord.js');

module.exports = {
    name: 'team',
    description: 'Get info on fantasy team.',
    usage: '< tag user>',
    execute(message, args) {

        var discordId;
        // if no arguments, use author
        if (!args.length) {
            discordId = message.author.id
        } else {
            // get user id from mention in argument
            console.log('mention')
            discordId = utils.getUserFromMention(args[0]);
        }

        // get team id
        const teamId = utils.espnIdFromDiscord(discordId)

        // get team info and create embed in callback
        const data = {
            teamId: teamId,
            owner: utils.ownerFromEspn(teamId)
        };
        fantasy.getTeamInfo(data, function(response) {
            const team = response.team;
        
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${team.name}`)
                .setURL(`https://fantasy.espn.com/football/team?leagueId=194518&seasonId=2020&teamId=${team.id}`)
                .setThumbnail(team.logoURL)
                .setDescription(response.owner)
                .addField(`${team.wins}-${team.losses}-${team.ties} (${utils.ordinal(team.rank)})`,
                    `PF: ${+team.regularSeasonPointsFor.toFixed(2)}
                    PA: ${+team.regularSeasonPointsAgainst.toFixed(2)}`)
        
            message.channel.send(embed);
        })
        
    },
};