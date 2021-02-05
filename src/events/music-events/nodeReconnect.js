const BaseEvent = require('../../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class NodeReconnect extends BaseEvent {
    constructor() {
        super('nodeReconnect');
    }

    async run(client, node) {
        console.log(boxen('Node reconnected!', { padding: 1, borderColor: '#ff0883' }));
    }

}