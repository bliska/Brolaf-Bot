const fantasy = require('../fantasy/fantasy-utils.js');
const Discord = require('discord.js');

function getTitle(type) {
    if (type === 'pf') {
        return 'Points For';
    } else if (type === 'pa') {
        return 'Points Against';
    } else {
        return 'Record';
    }
}

function getValue(type, team) {
    if (type === 'pf') {
        return `${+team.regularSeasonPointsFor.toFixed(2)}\n`;
    } else if (type === 'pa') {
        return `${+team.regularSeasonPointsAgainst.toFixed(2)}\n`;
    } else {
        return `${team.wins}-${team.losses}-${team.ties}\n`;
    }  
}


module.exports = {
    name: 'standings',
    description: 'Get league standings. Ordered by record by default. Add argument to order by points for (pf) or points against (pa).',
    usage: '<pf/pa>',
    execute(message, args) {

        var order;
        // if no arguments, use author
        if (!args.length) {
            order = 'rank';
        } else {
            // get user id from mention in argument
            order = args[0].toLowerCase();
            if (!(order === 'pa' || order === 'pf')) {
                return message.reply(`${order} is not a valid argument. Use pf for Points For or pa for Points Against.`);
            }
        }

        // get standings and create embed in callback
        const data = {
            type: order
        };
        fantasy.getStandings(data, teams => {
            let teamList = '';
            let rankList = '';
            let list = '';
            teams.forEach(team => {
                teamList += `${team.name}\n`;
                rankList += `${teams.indexOf(team) + 1}\n`;
                list += getValue(data.type, team);
            });
        
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Standings`)
                .setURL(`https://fantasy.espn.com/football/league/standings?leagueId=194518`)
                .setThumbnail('https://cdn.discordapp.com/icons/748216879268495481/7d2d68c11f29968e5d445812faf51cba.png')
                .addFields(
                    { name: 'Rank', value: rankList, inline: true },
                    { name: 'Team', value: teamList, inline: true },
                    { name: getTitle(data.type), value: list, inline: true },
                    )
        
            message.channel.send(embed);
        })
        
    },
};