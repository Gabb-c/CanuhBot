const BaseEvent = require('../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super('ready');
    }

    async run(client) {
        client.user.setActivity('!help', { type: 'WATCHING' })
                   .then(presence => console.log(boxen(`  Client is ready!\nActivity set to ${presence.activities[0].name}`, { padding: 1, borderColor: '#ff0883' })))
                   .catch(err => console.log(err));

        
    }
}