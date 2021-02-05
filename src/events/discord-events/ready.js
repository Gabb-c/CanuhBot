const BaseEvent = require('../../utils/structures/BaseEvent');
const boxen = require('boxen');
require('dotenv').config();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    async run(client) {
        client.user.setActivity(`${process.env.BOT_PREFIX}help`, { type: 'WATCHING' })
            .then(presence => console.log(boxen(`  Client is ready!\nActivity set to ${presence.activities[0].name}`, { padding: 1, borderColor: '#0883ff' })))
            .catch(err => console.log(err));

        client.manager.init(client.user.id);
    }
}