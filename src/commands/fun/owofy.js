const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Owofy extends BaseCommand {
    constructor() {
        super('owofy', 'fun', true, 'owofies the message', `${process.env.BOT_PREFIX}owofy  < message >`, 5);
    }

    async run(client, message, cmdArgs) {

        if (message.content.length > 500) throw `${message.author.username}, Your message is too long . . .`;

        const text = await neko.sfw.OwOify({ text: cmdArgs.join(' ') }).catch(() => { throw `Sorry ${message.author.username}, I could not owofy this text . . .` });

        let embed = new MessageEmbed()
            .setTitle("🐱 OwO 🐱")
            .setDescription(text.owo)
            .setColor('#800080')
            .setFooter(`OwOfyed by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp();
        await message.channel.send(embed);
    }
}