const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');

module.exports = class Play extends BaseCommand {
    constructor () {
        super('play', 'fun', true, 'Play some music!', `${process.env.BOT_PREFIX}play  < music_name >`, 5);
    }

    async run(client, message, cmdArgs) {
        let embed = new MessageEmbed()
            .setTitle('Command not ready yet cuz the fcking dev is too lazy .-.')
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setColor('#800080');

        message.channel.send(embed);
    }
}