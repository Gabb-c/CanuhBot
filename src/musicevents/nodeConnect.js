const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class NodeConnect extends BaseEvent {
    constructor() {
        super('nodeConnect');
    }

    async run(client, node) {
        console.log('New node connected!', node);
    }

}