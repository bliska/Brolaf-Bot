const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    usage: '<command name>',
    execute(message, args) {

        // object of commands
        const { commands } = message.client;

        // if no arguments, return list of commands
        if (!args.length) {

            const fields = [];
            commands.map(command => {
                fields.push( { 
                    name: `${prefix}${command.name}`, 
                    value: command.description 
                });
            });

            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Brolaf Bot Help')
                .setURL('https://github.com/bliska/Brolaf-Bot.git')
                .setDescription('I can respond to the following commands.')
                .setThumbnail('https://cdn.discordapp.com/icons/748216879268495481/7d2d68c11f29968e5d445812faf51cba.png')
                .addFields(fields)

            return message.channel.send(embed);
        }

        // otherwise, info about the command

        // get command in question
        const name = args[0].toLowerCase();
        const command = commands.get(name)

        // exit if command does not exist
        if (!command) {
            return message.reply('that command does not exist. Try !help to see a list of available commands.');
        }

        //return information about the command
        const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Brolaf Bot Help')
                .setURL('https://github.com/bliska/Brolaf-Bot.git')
                .setThumbnail('https://cdn.discordapp.com/icons/748216879268495481/7d2d68c11f29968e5d445812faf51cba.png')
                .addField(command.name, `${command.description}\nUsage: ${prefix}${command.name} ${command.usage}`)
        
        message.channel.send(embed);

    },
};