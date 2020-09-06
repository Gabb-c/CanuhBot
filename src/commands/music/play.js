const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');

module.exports = class Play extends BaseCommand {
    constructor () {
        super('play', 'fun', true, 'Play some music!', `${process.env.BOT_PREFIX}play  < music_name >`);
    }

    async run(client, message, cmdArgs) {
        message.channel.send('Command not ready yet cuz the fcking dev is too lazy .-.');
    }
}