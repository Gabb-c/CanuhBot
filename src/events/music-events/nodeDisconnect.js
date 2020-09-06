const BaseEvent = require('../../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class NodeDisconnect extends BaseEvent {
    constructor() {
        super('nodeDisconnect');
    }

    async run(client, node, error) {
        console.log(boxen(`Node Disconnected!`, { padding: 1, borderColor: "red" }));
    }

}