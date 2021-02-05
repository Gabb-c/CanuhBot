const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');

module.exports = class Raw extends BaseEvent {
    constructor() {
        super('raw');
    }

    async run(client, d) {
        await client.manager.updateVoiceState(d);
    }
}