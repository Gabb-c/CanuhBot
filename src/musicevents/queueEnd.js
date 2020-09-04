const BaseEvent = require('../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class QueueEnd extends BaseEvent {
    constructor() {
        super('queueEnd');
    }

    async run(client, player) {
        await client.music.players.destroy(player.guild.id);

        console.log(boxen('Queue has ended', { padding: 1, borderColor: '#ff0883'}));
    }

}