const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class mute extends BaseCommand {
    constructor () {
        super('mute', 'moderation', true, 'Mute the mentioned person. Must have mute role!', '!mute <mention>');
    }

    async run() {
        console.log('ssshhhhh!');
    }
    
}
