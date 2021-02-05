const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
module.exports = class Ban extends BaseCommand {
    constructor() {
        super('ban', 'moderation', true, 'Bans the mentioned person!', '< mention >', 5);
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