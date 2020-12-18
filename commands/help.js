const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    usage: '[command name]',
    execute(message, args) {

        // setup empty array of return information
        const data = [];

        // object of commands
        const { commands } = message.client;

        // if no arguments, return list of commands
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.channel.send(data, { split: true});

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