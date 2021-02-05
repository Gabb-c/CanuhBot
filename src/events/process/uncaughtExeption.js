const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');

module.exports = class UncaughtExeption extends BaseEvent {
    constructor() {
        super('uncaughtExeption');
    }

    async run(error, origin) {
        raven.captureException(error);
    }
}