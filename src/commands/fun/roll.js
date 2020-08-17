const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class roll extends BaseCommand {
    constructor () {
        super('roll', 'fun', true, 'Roll a D4 . . . D20 !', '!roll <dice_type>');
    }

    async run(client, message, cmdArgs) {
        console.log('Rolling the dice!');
    }
}
