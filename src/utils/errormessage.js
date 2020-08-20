const { MessageEmbed } = require('discord.js');

async function errorMessage(message, Error) {
    let embed = new MessageEmbed();

    embed.setTitle(Error.message)
         .setDescription(message.author.username + ', Check the !help <command_name> command to more info UwU')
         .setTimestamp()
         .setColor('#800080');
    
    message.channel.send(embed);
}

module.exports = { errorMessage };