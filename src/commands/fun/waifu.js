const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Waifu extends BaseCommand {
    constructor () {
        super('waifu', 'fun', false, 'Gets a waifu for yourself', `${process.env.BOT_PREFIX}waifu`);
    }

    async run(client, message) {

        let embed = new MessageEmbed();

        embed.setTitle(`${message.author.username}, she is your new waifu ♥`)
             .setColor('#800080')
             .setImage(await (await neko.sfw.waifu()).url)
             .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
             .setTimestamp();

        message.channel.send(embed);

    }
}