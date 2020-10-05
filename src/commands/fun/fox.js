const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Fox extends BaseCommand {
    constructor() {
        super('fox', 'fun', false, 'Gets a fox for yourself', '', 5);
    }

    async run(client, message) {
        const img = await neko.sfw.foxGirl().catch(() => { throw `Sorry ${message.author.username}, I could not get any image . . .` });

        let embed = new MessageEmbed()
            .setTitle(`${message.author.username}, I knew u were a furry ♥`)
            .setColor('#800080')
            .setImage(img.url)
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp();
        await message.channel.send(embed);
    }
}