const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');

module.exports = class ShardError extends BaseEvent {
    constructor() {
        super('shardError');
    }

    async run(client, error) {
        console.log(boxen(`  Websocket error!\n${error.message}`, { padding: 1, borderColor: "red" }));
    }
}