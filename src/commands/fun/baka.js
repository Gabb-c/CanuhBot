const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Baka extends BaseCommand {
    constructor() {
        super('baka', 'fun', false, 'Baka baka baka', `${process.env.BOT_PREFIX}baka`, 5);
    }

    async run(client, message, cmdArgs) {

            let embed = new MessageEmbed();

            embed.setImage(await (await neko.sfw.baka()).url)
                 .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                 .setTimestamp()
                 .setColor('#800080');

            message.channel.send(embed);

    }

}