const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Feed extends BaseCommand {
    constructor() {
        super('feed', 'fun', true, 'Feeds the mentioned person', '< mention >', 5);
    }

    async run(client, message) {

        if (!message.mentions.users.first()) throw `${message.author.username}, You need to mention someone to feed . . .`;
        if (message.mentions.users.first().id == client.user.id && message.author.id !== process.env.BOT_OWNER_ID) return message.reply("Only my Dev can do this !");
        if (message.mentions.users.first().id == message.author.id) return message.reply(" feed your best friend and dont be shy :3");
        if (message.mentions.users.first().id == client.user.id && message.author.id == process.env.BOT_OWNER_ID) return message.reply("B-Baka! >///<");

        const img = await neko.sfw.feed().catch(() => { throw `Sorry ${message.author.username}, I could not get any image . . .` });

        let embed = new MessageEmbed()
            .setTitle(`${message.author.username} is feeding ${message.mentions.users.first().username} ♥`)
            .setColor('#800080')
            .setImage(img.url)
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp();
        await message.channel.send(embed);
    }
}