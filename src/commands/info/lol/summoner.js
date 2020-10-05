const BaseCommand = require('../../../utils/structures/BaseCommand');
require('dotenv').config();
const { getSummonerByName } = require('../../../utils/league/getSummonerByName');
const regions = require('../../../utils/league/regions');
const { MessageEmbed } = require('discord.js');

module.exports = class Summoner extends BaseCommand {
    constructor() {
        super('summoner', 'info', true, 'Shows a lol summoner account', `${process.env.BOT_PREFIX + Summoner.name}`, 5);
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

            let msg = await message.channel.send('Searching . . . 🔎');

            const summoner = await getSummonerByName(cmdArgs.join(' '), choice.cod);

            msg.edit({ embed: {
                title: summoner.name,
                description: [
                    `\`Level ${summoner.summonerLevel}\``,
                    `\`Solo/Duo ${summoner.ranked.soloDuo.tier} ${summoner.ranked.soloDuo.rank} | ${summoner.ranked.soloDuo.wins}W ${summoner.ranked.soloDuo.losses}L\``,
                    `\`Flex ${summoner.ranked.flex.tier} ${summoner.ranked.flex.rank} | ${summoner.ranked.flex.wins}W ${summoner.ranked.flex.losses}L\``
                ].join('\n'),
                thumbnail: { url: summoner.profileIcon },
                footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
                timestamp: new Date(),
                color: '#800080'
            }});

        }).catch(err => {
            message.channel.send(`${message.author.username}, nothing founded . . .`);
        });
        
    }

}