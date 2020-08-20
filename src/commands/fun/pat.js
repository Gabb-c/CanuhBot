const BaseCommand = require('../../utils/structures/BaseCommand');
const Client = require('nekos.life');
const neko = new Client();
const { MessageEmbed } = require('discord.js');

module.exports = class Pat extends BaseCommand {
    constructor(){
        super('pat', 'fun', true, 'Pats someone!', '!pat <mentioned_person>');
    }

    async run(client, message, cmdArgs) {

        if (!message.mentions.users.first()) {
            throw new Error("You need to mention someone to pat . . .");
        }
        if (message.mentions.users.first().id == client.user.id && message.author.id !== "345609067181375490") return message.reply("No patting unless you're my Dev !");
        if (message.mentions.users.first().id == message.author.id) return message.reply(" I guess this is cringe . - .");
        if (message.mentions.users.first().id == client.user.id && message.author.id == "345609067181375490") return message.reply("B-Baka! >///<");

        let embed = new MessageEmbed()
            .setTitle(`${message.author.username} is patting ${message.mentions.first().username} :3`)
            .setImage(await (await neko.sfw.pat()).url)
            .setColor('#800080')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        
        message.channel.send(embed);

    }

}