const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');

module.exports = class ErrorEvent extends BaseEvent {
    constructor() {
        super('error');
    }

    async run(client, error) {
        console.log(boxen(`  Client error!\n${error.message}`, { padding: 1, borderColor: "red" }));
    }
}