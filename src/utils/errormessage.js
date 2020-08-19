const { MessageEmbed } = require('discord.js');

async function errorMessage(message, Error) {
    let embed = new MessageEmbed();

    embed.setTitle(Error.message.toUpperCase())
         .setDescription(message.author.username + ', I think you misstyped the command  .-. \nCheck the !help <command_name> command to more info UwU')
         .setTimestamp()
         .setColor('#800080');
    
    message.channel.send(embed);
}

module.exports = { errorMessage };