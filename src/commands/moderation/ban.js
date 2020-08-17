const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ban extends BaseCommand {
    constructor () {
        super('ban', 'moderation', true, 'Bans the mentioned person!', '!ban <mention>');
    }

    async run() {
        console.log('Ban command is my favorite one!');
    }
}