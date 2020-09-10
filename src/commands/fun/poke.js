const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life')
const neko = new Client();
require('dotenv').config();
module.exports = class Poke extends BaseCommand{
    constructor(){
        super('poke', 'fun', true, 'Pokes the mentioned person!', `${process.env.BOT_PREFIX}poke  < mention >`, 5);
    }

    async run(client, message, cmdArgs) {

        if(!message.mentions.users.first()) throw `${message.author.username}, You need to mention someone to poke . . .`;
        if (message.mentions.users.first().id == message.author.id) return message.reply(" are you ok ?");
        if (message.mentions.users.first().id == client.user.id) return message.reply(" yare yare daze . . . ゴ ゴ ゴ ゴ ゴ");

        let embed = new MessageEmbed();

        embed.setTitle(`${message.author.username} poked ${message.mentions.users.first().username} !`)
             .setImage(await (await neko.sfw.poke()).url)
             .setColor('#800080')
             .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
             .setTimestamp();

        message.channel.send(embed);

    }
    
}