const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Baka extends BaseCommand {
    constructor() {
        super('baka', 'fun', false, 'Baka baka baka', '', 5);
    }

    async run(client, message, cmdArgs) {
        const img = await neko.sfw.baka().catch(() => { throw `Sorry ${message.author.username}, I could not get any image . . .` });

        let embed = new MessageEmbed()
            .setImage(img.url)
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setColor('#800080');
        await message.channel.send(embed);
    }
}