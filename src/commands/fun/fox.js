const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Fox extends BaseCommand {
    constructor () {
        super('fox', 'fun', false, 'Gets a fox for yourself', `${process.env.BOT_PREFIX}fox`, 5);
    }

    async run(client, message) {

        let embed = new MessageEmbed();

        embed.setTitle(`${message.author.username}, I knew u were a furry ♥`)
             .setColor('#800080')
             .setImage(await (await neko.sfw.foxGirl()).url)
             .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
             .setTimestamp();

        message.channel.send(embed);

    }
}