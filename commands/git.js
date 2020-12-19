module.exports = {
	name: 'git',
    description: 'GitHub respository url.',
    args: false,
    usage: ' ',
	execute(message, args) {
		message.channel.send('https://github.com/bliska/Brolaf-Bot.git');
	},
};