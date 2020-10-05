const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Waifu extends BaseCommand {
    constructor() {
        super('waifu', 'fun', false, 'Gets a waifu for yourself', '', 5);
    }

    async run(client, message) {
        const img = await neko.sfw.waifu().catch(() => { throw `Sorry ${message.author.username}, I could not get any image . . .` });

        let embed = new MessageEmbed()
            .setTitle(`${message.author.username}, she is your new waifu ♥`)
            .setColor('#800080')
            .setImage(img.url)
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp();
        await message.channel.send(embed);
    }
}