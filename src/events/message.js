require('dotenv').config();
const BaseEvent = require('../utils/structures/BaseEvent');
const { noArgs } = require('../utils/noargs');
const { errorMessage } = require('../utils/errormessage');

module.exports = class MesssageEvent extends BaseEvent {
    constructor () {
        super('message');
    }

    async run(client, message) {
        if(message.author.bot) return;
        
        if (message.content.startsWith(process.env.BOT_PREFIX)) {
            const [cmdName, ...cmdArgs] = message.content
                                                 .toLowerCase()
                                                 .slice(process.env.BOT_PREFIX.length)
                                                 .split(/\s+/);
            const command = client.commands.get(cmdName);

            if(!command) {
                await errorMessage(message);

            } else if(cmdArgs == '' && command.args) {
                await noArgs(message);

            } else if (command) {
                command.run(client, message, cmdArgs)
                       .catch(err => console.log(err));
            }
        }
    }
}