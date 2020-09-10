const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = class help extends BaseCommand {
    constructor(){
        super('help', 'info', false, 'Shows information about the bot fuctionalities!', `${process.env.BOT_PREFIX}help < command_name >`, 5);
    }

    async run(client, message, cmdArgs) {
        let command = client.commands.get(cmdArgs.toString());
        let embed = new MessageEmbed();

        if(command) {
            embed.setTitle(`📌  ${command.name.toUpperCase()}  📌`)
                 .setDescription("`" + command.description + "`\n" 
                                 + "`" + command.structure + "`")
                 .setColor('#800080')
                 .setTimestamp()
                 .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
            
            message.channel.send(embed);
        }
        else {
            client.commands.forEach(c => {
                embed.addField(c.name.toUpperCase(),
                               '\n' + c.description + '\n' + c.structure + '\n',
                               true);
            });

            embed.setTitle('📌 B   O   T     H   E   L   P    ! 📌')
                 .setColor('#800080')
                 .setTimestamp()
                 .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

            message.channel.send(embed);
        }
    }
}
