const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class help extends BaseCommand {
    constructor(){
        super('help', 'info', false, 'Shows information about the bot fuctionalities!', '!help < command_name >');
    }

    async run(client, message, cmdArgs) {
        let command = client.commands.get(cmdArgs.toString());
        let embed = new MessageEmbed();

        if(command) {
            embed.setTitle(command.name.toUpperCase())
                 .setDescription('DESCRIPTION: ' + command.description + '\n' +
                                 'STRUCTURE: '   + command.structure           )
                 .setColor('#800080')
                 .setTimestamp();
            
            message.channel.send(embed)
                           .catch(err => console.log(err));
        }
        else {
            client.commands.forEach(c => {
                embed.addField(c.name.toUpperCase(),
                               '\n' + c.description + '\n' + c.structure + '\n',
                               true);
            });

            embed.setTitle('B   O   T     H   E   L   P    !')
                 .setColor('#800080')
                 .setTimestamp();

            message.channel.send(embed)
                           .catch(err => console.log(err));
        }
    }
}