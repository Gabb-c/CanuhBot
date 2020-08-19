const { MessageEmbed } = require('discord.js');

async function commandNotFound(message) {
    let embed = new MessageEmbed();

    embed.setTitle('O H    J E E Z    !')
         .setDescription(message.author.username + ', I think you misstyped the command  .-. \nCheck the !help <command_name> command to more info UwU')
         .setTimestamp()
         .setColor('#800080');
    
    message.channel.send(embed);
}

module.exports = { commandNotFound };