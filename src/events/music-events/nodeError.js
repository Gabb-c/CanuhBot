const BaseEvent = require('../../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class NodeError extends BaseEvent {
    constructor() {
        super('nodeError');
    }

    async run(client, node, error) {
        console.log(boxen(`Node error! \n${error.message}`, { padding: 1, borderColor: '#ff0883' }));
    }

}