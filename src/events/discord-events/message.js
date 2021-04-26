require('dotenv').config();
const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');
const { noArgs } = require('../../utils/discord-functions/noargs');
const { errorMessage } = require('../../utils/discord-functions/errormessage');
const { commandNotFound } = require('../../utils/discord-functions/commandnotfound');

module.exports = class MesssageEvent extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(client, message) {
        if (message.author.bot || message.channel.type === 'dm') return;

        if (message.content.startsWith(process.env.BOT_PREFIX)) {
            const [cmdName, ...cmdArgs] = message.content
                .toLowerCase()
                .slice(process.env.BOT_PREFIX.length)
                .split(/\s+/);

            const command = client.commands.get(cmdName);

            if (!command) {
                await commandNotFound(message);

            } else if (cmdArgs == '' && command.args) {
                await noArgs(message);

            } else if (command) {
                command.run(client, message, cmdArgs)
                    .catch(err => errorMessage(message, err, command));
            }
        }
    }
}