const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class kiss extends BaseCommand {
    constructor () {
        super('kiss', 'fun', true, 'Kiss the mentioned person', '!kiss <mention>');
    }

    async run() {
        console.log('Please kiss me .-.');
    }
}