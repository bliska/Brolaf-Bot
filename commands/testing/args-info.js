module.exports = {
    name: 'args-info',
    description: 'Information about arguments provided.',
    args: true,
    usage: '<arg1> <arg2> ...',
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};