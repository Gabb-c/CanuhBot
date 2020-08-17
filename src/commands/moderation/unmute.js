const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class unmute extends BaseCommand {
    constructor () {
        super('unmute', 'moderation', true, 'Unmute the mentioned person!', '!unmute <mention>');
    }

    async run() {
        console.log('Unmuted');
    }
}