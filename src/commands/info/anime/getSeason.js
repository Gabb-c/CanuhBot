require('dotenv').config();
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Aniclient = require('mal-scraper');
const { MessageEmbed } = require('discord.js');
const seasons = require('../../../utils/weeb/seasons');
const types = require('../../../utils/weeb/types');

module.exports = class Season extends BaseCommand {
    constructor() {
        super('season', 'info', true, 'Shows the animes of the season', `< year >`, 5);
    }

    async run(client, message, cmdArgs) {

        let embed = new MessageEmbed()
            .setTitle('Choose the season:')
            .setDescription([
                seasons.map((season, key) => `\`${key + 1}) ${season.name} ${season.flag}\``).join('\n')
            ].join('\n'))
            .setColor('#800080')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

        await message.channel.send(embed);

        const seasonFilter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= seasons.length);

        message.channel.awaitMessages(seasonFilter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
            const entrySeason = collected.first().content;
            const choiceSeason = seasons[entrySeason - 1];

            embed.setTitle('Choose the type')
                 .setDescription([
                     types.map((type, key) => `\`${key + 1}) ${type.name}\``).join('\n')
                 ].join('\n'));

            await message.channel.send(embed);

            const typeFilter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= types.length);

            message.channel.awaitMessages(typeFilter, { max: 1, time: 20000, errors: ['time'] }).then(async get => {
                let msg = await message.channel.send('Searching . . . 🔎');
                const entryType = get.first().content;
                const choiceType = types[entryType - 1];

                const res = await Aniclient.getSeason(cmdArgs.join(' '), choiceSeason.code, choiceType.cod);
                console.log(res);

                await msg.edit({ embed: {
                    title: `${choiceType.cod} of ${cmdArgs.join(' ')}`,
                    description: [
                        res.map((r, key) => `${r.title}`).join('\n')
                    ].join('\n'),
                    color: '#800080',
                    footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
                    timestamp: new Date(),
                }});

            }).catch(err => {
                message.channel.send(`${message.author.username}, nothing founded . . .`);
            });


        }).catch(err => {
            message.channel.send(`${message.author.username}, nothing founded . . .`);
        });

    }

}