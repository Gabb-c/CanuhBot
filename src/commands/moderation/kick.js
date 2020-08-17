const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class kick extends BaseCommand {
    constructor () {
        super('kick', 'moderation', true, 'Kicks the mentioned person!', '!kick < mention >');
    }

    async run() {
        console.log('O O F !');
    }
}