const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

async function noArgs(message) {
    let embed = new MessageEmbed();

    embed.setTitle('M  I  S  S  I  N  G     A  R  G  S  !')
        .setDescription(message.author.username + ', you need to type something else! \n !help <command_name> to more info . . .')
        .setTimestamp()
        .setColor('#800080');

    message.channel.send(embed);
}

module.exports = { noArgs };