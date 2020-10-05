const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life');
const neko = new Client();
require('dotenv').config();

module.exports = class Kiss extends BaseCommand {
    constructor() {
        super('kiss', 'fun', true, 'Kiss the mentioned person', '< mention >', 5);
    }

    async run(client, message) {

        if (!message.mentions.users.first()) throw `${message.author.username}, You need to mention someone to kiss . . .`;
        if (message.mentions.users.first().id == client.user.id && message.author.id !== process.env.BOT_OWNER_ID) return message.reply("No kissing unless you're my Dev !");
        if (message.mentions.users.first().id == message.author.id) return message.reply(" W T F  ? !");
        if (message.mentions.users.first().id == client.user.id && message.author.id == process.env.BOT_OWNER_ID) return message.reply("B-Baka! >///<");

        const img = await neko.sfw.kiss().catch(() => { throw `Sorry ${message.author.username}, I could not get any image . . .` });


        let embed = new MessageEmbed()
            .setTitle(`${message.author.username} kissed ${message.mentions.users.first().username} ♥`)
            .setColor('#800080')
            .setImage(img.url)
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp();
        await message.channel.send(embed);
    }
}