const utils = require('../utils/utils.js');
const fantasy = require('../fantasy/fantasy-utils.js');
const Discord = require('discord.js');

// get the fields for the boxscore embed
function organizeBoxInfo(box, teams) {
    const fields = {};
    const homeId = box.homeTeamId;
    const awayId = box.awayTeamId;

    fields.home = addTeam(homeId, box.homeScore, teams);
    fields.away = addTeam(awayId, box.awayScore, teams);

    return fields;
}

// get info on a team and make a single embed line
function addTeam(homeId, score, teams) {
    const team = fantasy.getTeam(homeId, teams);
    const record = `${team.wins}-${team.losses}-${team.ties} (${utils.ordinal(team.rank)})`

    // construct fields (need to add a fake third field to stack inlines)
    return [{ name: `${team.name}`, value: record, inline: true },
    { name: '\u200B', value: '\u200B', inline: true }, 
    { name: `${score}`, value: '\u200B', inline: true } 
    ];
}

// get logo of winning team
function getLogoForWinner(box, teams) {
    let logo = '';
    if (+box.homeScore > +box.awayScore) {
        logo = getLogoForTeam(box.homeTeamId, teams);
    } else if (+box.awayScore > +box.homeScore) {
        logo = getLogoForTeam(box.awayTeamId, teams);
    } else {
        // tie
        logo = 'https://cdn.discordapp.com/icons/748216879268495481/7d2d68c11f29968e5d445812faf51cba.png';
    };
    // account for teams with no logo url (eli and dan)
    if (logo === 'https://g.espncdn.com/s/ffllm/logos/FrozenTundra-ToddDetwiler/TundraPack_05_01.svg') {
        logo = 'https://i.imgur.com/dYXEF9D.png';
    } else if (!logo) {
        logo = 'https://i.imgur.com/ZJ8f4kh.png'
    }
    return logo;
}

function getLogoForTeam(id, teams) {
    const team = fantasy.getTeam(id, teams);
    return team.logoURL;
}

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
                    const fields = organizeBoxInfo(box, teams);

                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setThumbnail(getLogoForWinner(box, teams))
                    .addFields(fields.home)
                    .addFields(fields.away)
            
                    message.channel.send(embed);
                });
               
            });
        });
    }
}