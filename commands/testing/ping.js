module.exports = {
	name: 'ping',
    description: 'Ping! Pong.',
    args: false,
    usage: ' ',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};