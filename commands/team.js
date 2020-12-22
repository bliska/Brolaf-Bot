const utils = require('../utils/utils.js');
const fantasy = require('../fantasy/fantasy-utils.js');
const Discord = require('discord.js');

module.exports = {
    name: 'team',
    description: 'Get info on fantasy team.',
    usage: '<tag user>',
    execute(message, args) {

        var discordId;
        // if no arguments, use author
        if (!args.length) {
            discordId = message.author.id
        } else {
            // get user id from mention in argument
            discordId = utils.getUserFromMention(args[0]);
        }

        // get team id
        const teamId = utils.espnIdFromDiscord(discordId)

        // get team info and create embed in callback
        const data = {
            teamId: teamId,
            owner: utils.ownerFromEspn(teamId)
        };
        fantasy.getTeamsInfo(data, teams => {

            const team = fantasy.getTeam(data.teamId, teams);

            const rank = utils.ordinal(team.rank);
            const pf = +team.regularSeasonPointsFor.toFixed(2);
            const pa = +team.regularSeasonPointsAgainst.toFixed(2)
            const pfRank = utils.ordinal(team.pfRank);
            const paRank = utils.ordinal(team.paRank);
        
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${team.name}`)
                .setURL(`https://fantasy.espn.com/football/team?leagueId=194518&seasonId=2020&teamId=${team.id}`)
                .setThumbnail(team.logoURL)
                .setDescription(data.owner)
                .addField(`${team.wins}-${team.losses}-${team.ties} (${rank})`,
                    `PF: ${pf} (${pfRank})\nPA: ${pa} (${paRank})`)
        
            message.channel.send(embed);
        })
    },
};