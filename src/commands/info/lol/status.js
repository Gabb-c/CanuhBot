const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { LolApi } = require('twisted');
const { getStatusByShard } = require('../../../utils/league/getStatusByShard');
const api = new LolApi( { key: process.env.LOL_API_KEY } );
const regions = require('../../../utils/league/regions');

module.exports = class Status extends BaseCommand {
    constructor() {
        super('status', 'info', false, 'Shows information of the league servers', `${process.env.BOT_PREFIX + Status.name}`, 5);
    }

    async run(client, message, cmdArgs) {
        let embed = new MessageEmbed()
            .setTitle('Choose a region . . .')
            .setDescription([
                regions.map((r, key) => `\`${key + 1}) ${r.name} ${r.flag}: ${r.cod}\``).join('\n')
            ])
            .setColor('#800080')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

        await message.channel.send(embed);

        const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= regions.length);

        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
            const entry = collected.first().content;
            const choice = regions[entry-1];

            await message.channel.send('Pinging . . .');

            const status = await getStatusByShard(choice.cod);

            let msg = new MessageEmbed()
                .setTitle(`${choice.name}  ${choice.flag}  ${choice.cod}`)
                .setDescription([
                    status.services.map(s => `\`${s.name}:  ${s.status}\``).join('\n')
                ])
                .setColor('#800080')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

            message.channel.send(msg);

        }).catch(err => {
            message.channel.send(`${message.author.username}, I could not ping . . .`);
        });
    }
}