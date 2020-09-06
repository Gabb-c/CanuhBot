const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
module.exports = class Ban extends BaseCommand {
    constructor () {
        super('ban', 'moderation', true, 'Bans the mentioned person!', `${process.env.BOT_PREFIX}ban  < mention >`);
    }

    async run(client, message, cmdArgs) {
        throw 'Exeption';
    }
}