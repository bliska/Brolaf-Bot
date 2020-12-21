const utils = require('../utils/utils.js');
const fantasy = require('../fantasy/fantasy-utils.js');
const Discord = require('discord.js');

module.exports = {
    name: 'boxscore',
    description: 'Get boxscore for matchup.',
    usage: '<pf/pa>',
    execute(message, args) {

        var discordId;
        var id;
        // if no arguments, use author
        if (args[0]) {
            // get user id from mention in argument
            discordId = utils.getUserFromMention(args[0]);
            id = utils.espnIdFromDiscord(discordId);
        } else {
            id = '';
        };

        // set id
        const data = {
            id: id
        };

        // get relevant box scores
        fantasy.getBoxscores(data, boxes => {
            const data = {
                boxScores: boxes
            }
            // now get info on all of the teams
            fantasy.getTeamsInfo(data, teams => {
                data.boxScores.forEach(box => {
                    // get relevant details about each team


                });

                // create embed
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Boxscore`)
                .setURL(``)
                .setThumbnail('')
                .addFields()
        
                message.channel.send(embed);
               
            });
        });
    }
}