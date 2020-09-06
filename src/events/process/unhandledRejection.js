const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');

module.exports = class UnhandledRejection extends BaseEvent {
    constructor () {
        super('unhandledRejection');
    }

    async run(reason, promise, error) {
        raven.captureException(error);
    }
}