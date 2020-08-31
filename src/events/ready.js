const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super('ready');
    }

    async run(client) {
        client.user.setActivity('!help', { type: 'WATCHING' })
                   .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
                   .catch(err => console.log(err));

        
    }
}