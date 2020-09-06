const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Client = require('nekos.life')
const neko = new Client();
require('dotenv').config();

module.exports = class Slap extends BaseCommand{
    constructor(){
        super('slap', 'fun', true, 'Slaps the mentioned person!', `${process.env.BOT_PREFIX}slap  < mention >`);
    }

    async run(client, message, cmdArgs) {

        if(!message.mentions.users.first()) throw 'You need to mention someone to slap . . .';
        if (message.mentions.users.first().id == message.author.id) return message.reply(" are you ok ?");
        if (message.mentions.users.first().id == client.user.id) return message.reply(" yare yare daze . . . ゴ ゴ ゴ ゴ ゴ");

        let embed = new MessageEmbed();

        embed.setTitle(`${message.author.username} slapped ${message.mentions.users.first().username} !`)
             .setImage(await (await neko.sfw.slap()).url)
             .setColor('#800080')
             .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
             .setTimestamp();

        message.channel.send(embed);

    }
    
}