const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
module.exports = class Roll extends BaseCommand {
    constructor () {
        super('roll', 'fun', false, 'Roll a D20 !', `${process.env.BOT_PREFIX}roll`);
    }

    async run(client, message, cmdArgs) {
        let msg = await message.channel.send('Rolling . . . 🎲');

        msg.edit({ embed: {
            title: "R O L L",
            description: [ `${message.author.username} rolled a ${Math.floor(Math.random() * 20) + 1} !` ].join("\n"),
            footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
            timestamp: new Date(),
            color: '#800080'
        }});

    }
}
