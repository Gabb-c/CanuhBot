const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
module.exports = class ban extends BaseCommand {
    constructor () {
        super('ban', 'moderation', true, 'Bans the mentioned person!', `${process.env.BOT_PREFIX}ban  < mention >`);
    }

    async run(client, message, cmgArgs) {
        let embed = new MessageEmbed()
            .setTitle('Command not ready yet  .-. ')
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setColor('#800080');
            
        message.channel.send(embed);
    }
}