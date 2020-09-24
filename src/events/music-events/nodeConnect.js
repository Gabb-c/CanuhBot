const BaseEvent = require('../../utils/structures/BaseEvent');
const boxen = require('boxen');

module.exports = class NodeConnect extends BaseEvent {
    constructor() {
        super('nodeConnect');
    }

    async run(client) {
        console.log(boxen('New node connected!', { padding: 1, borderColor: '#ff0883'}));
    }

}