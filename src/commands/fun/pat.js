const BaseCommand = require('../../utils/structures/BaseCommand');
const Client = require('nekos.life');
const neko = new Client();
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
module.exports = class Pat extends BaseCommand {
    constructor(){
        super('pat', 'fun', true, 'Pats someone!', `${process.env.BOT_PREFIX}pat  < mention >`, 5);
    }

    async run(client, message, cmdArgs) {

        if (!message.mentions.users.first()) throw `${message.author.username}, You need to mention someone to pat . . .`;
        if (message.mentions.users.first().id == client.user.id && message.author.id !== process.env.BOT_OWNER_ID) return message.reply("No patting unless you're my Dev !");
        if (message.mentions.users.first().id == message.author.id) return message.reply(" I guess this is cringe . - .");
        if (message.mentions.users.first().id == client.user.id && message.author.id == process.env.BOT_OWNER_ID) return message.reply("B-Baka! >///<");

        let embed = new MessageEmbed()
            .setTitle(`${message.author.username} is patting ${message.mentions.users.first().username} :3`)
            .setImage(await (await neko.sfw.pat()).url)
            .setColor('#800080')
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        
        message.channel.send(embed);

    }

}