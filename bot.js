// require file system, .env, config
const fs = require('fs')
require('dotenv').config();
const { prefix } = require('./config.json');

// require discord, create discord client
const Discord = require('discord.js');
const client = new Discord.Client();

// retrieve commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


// handle event and call function
client.on('ready', () => {
    console.log('Bot is ready.')
});

// listen for messages and execute commands
client.on('message', message => {
    // exit early if message doesn't start with ! or from bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    // log messages (just to console for now)
    console.log(`${message.author.tag}: ${message.content}`)

    // pull out command and make array of arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // check command exists and exit early if it does not
    const command = client.commands.get(commandName);
    if (!command) {
        message.reply('that command does not exist. Try !help to see a list of available commands.');
        return;
    }

    // check if arguments are required by commmand and provided
    if (command.args && !args.length) {
        let reply =`this command requires arguments.`;
        if (command.usage) {
            reply += `\nThe proper usage is ${prefix}${command.name} ${command.usage}`
        }

        return message.reply(reply)
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command.');
    }
});

// login to discord
client.login(process.env.BOT_TOKEN)