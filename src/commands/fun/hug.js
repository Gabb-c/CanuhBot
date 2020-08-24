const BaseCommand = require('../../utils/structures/BaseCommand');
const Client = require('nekos.life');
const neko = new Client();
const { MessageEmbed } = require('discord.js');

module.exports = class Hug extends BaseCommand {
    constructor() {
        super('hug', 'fun', true, 'Hugs the mentioned person', '!hug <mention>');
    }

    async run(client, message, cmdArgs) {

        if (!message.mentions.users.first()) {
            throw new Error("You need to mention someone to hug . . .");
        }
        if (message.mentions.users.first().id == client.user.id && message.author.id !== "345609067181375490") return message.reply("No hugs unless you're my Dev !");
        if (message.mentions.users.first().id == message.author.id) return message.reply(" W T F  ? !");
        if (message.mentions.users.first().id == client.user.id && message.author.id == "345609067181375490") return message.reply("B-Baka! >///<");

            let embed = new MessageEmbed();

            embed.setTitle(`${message.author.username} hugged ${message.mentions.users.first().username} ♥`)
                 .setColor('#800080')
                 .setImage(await (await neko.sfw.hug()).url)
                 .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                 .setTimestamp();

            message.channel.send(embed);

    }

}