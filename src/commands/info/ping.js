const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class ping extends BaseCommand {
    constructor () {
        super('ping', 'info', false, 'Shows the ping of the bot in ms!', '!ping');
    }

    async run(client, message) {
        let msg = await message.channel.send('Pinging . . .');

        msg.edit({ embed: {
            title: "📶 Ping",
            description: [
              "S E R V E R : `" + (msg.createdAt - message.createdAt) + "ms`",
              "W E B S O C K E T : `" + Math.round(client.ws.ping) + "ms`"
            ].join("\n"),
            footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL },
            timestamp: new Date(),
            color: '#800080'
        }});
    }
    
}
