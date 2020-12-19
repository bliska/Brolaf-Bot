const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help2',
    description: 'List all of my commands or info about a specific command.',
    usage: '[command name]',
    execute(message, args) {

        // setup empty array of return information
        const data = [];

        // object of commands
        const { commands } = message.client;

        // if no arguments, return list of commands
        if (!args.length) {

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Brolaf Bot Help')
                .setDescription('I can respond to the following commands. Use \'!\' to start each command.')
                .setURL('https://cdn.discordapp.com/icons/748216879268495481/7d2d68c11f29968e5d445812faf51cba.png')
                .addFields([{name: '1', value: 'one' }, {name: '2', value: 'two' }, {name: '3', value: 'three' }])

            return channel.send(embed);

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
        data.push(`Name: ${command.name}`);

        if (command.description) data.push(`Description: ${command.description}`);
        if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });

    },
};