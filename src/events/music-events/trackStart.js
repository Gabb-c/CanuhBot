const BaseEvent = require('../../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class TrackStart extends BaseEvent {
    constructor() {
        super('trackStart');
    }

    async run(client, player, track) {
        console.log(player);
    }

}