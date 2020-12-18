module.exports = {
	name: 'boop',
    description: 'Boop! Bop!',
    args: false,
    usage: ' ',
	execute(message, args) {
		message.channel.send('Bop!');
	},
};