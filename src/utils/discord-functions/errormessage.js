const { MessageEmbed } = require('discord.js');
const raven = require('raven');

async function errorMessage(message, error, command) {
    let embed = new MessageEmbed()
        .setColor('#800080');

    if (error instanceof Error) {
        raven.captureMessage(`Command Error: ${command.name}\n${error.stack || error}`);
    }

    if (error.message) {
        embed.setTitle(`Sorry ${message.author.username}, I could not run this command .-.`);
        message.channel.send(embed);
    }
    else {
        embed.setTitle(`${error}`);
        message.channel.send(embed);
    }
}

module.exports = { errorMessage };