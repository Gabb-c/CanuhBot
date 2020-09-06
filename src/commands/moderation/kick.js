const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');

module.exports = class Kick extends BaseCommand {
    constructor () {
        super('kick', 'moderation', true, 'Kicks the mentioned person!', `${process.env.BOT_PREFIX}kick  < mention >`);
    }

    async run(client, message, cmdArgs) {
        let embed = new MessageEmbed()
            .setTitle('Command not ready yet  .-. ')
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setColor('#800080');

        message.channel.send(embed);
    }
}