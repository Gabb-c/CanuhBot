const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { getCard } = require('../../../utils/runeterra/getCard');
require('dotenv').config();

module.exports = class LorCard extends BaseCommand {
    constructor() {
        super('lorcard', 'info', true, 'Shows info of an LoR card', '< name >', 5);
    }

    async run(client, message, cmdArgs) {
        await message.channel.send('Searching . . . 🔎');

        const card = await getCard(cmdArgs.join(' '));

        if (card.response.card.length > 1) {
            let embed = new MessageEmbed()
                .setTitle(`Results for "${cmdArgs.join(' ')}"`)
                .setColor('#800080')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

            card.response.card.forEach((element, key) => {
                embed.addField(`${key + 1}) ${element.name} | ${element.cardCode}`, [
                    "`Cost 💎 " + element.cost + "`",
                    "`Attack 🗡️ " + element.attack + "`",
                    "`Health ♥ " + element.health + "`",
                    "`Set 🏷️ " + element.region + "`",
                    "`Type 🔖 " + element.type + "`",
                    "`Rarity ⭐ " + element.rarityRef + "`"
                ].join('\n')
                    , true);
            });

            await message.channel.send(embed);

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= card.response.card.length);

            message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
                const entry = collected.first().content;
                const choice = card.response.card[entry - 1];

                await message.channel.send('Searching . . . 🔎');

                let cardEmbed = new MessageEmbed()
                    .setTitle(`${choice.name}`)
                    .setThumbnail(`https://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${choice.regionRef.toLowerCase()}.png`)
                    .setDescription(choice.flavorText)
                    .addField('Stats', [
                        "`Cost 💎 " + choice.cost + "`",
                        "`Attack 🗡️ " + choice.attack + "`",
                        "`Health ♥ " + choice.health + "`",
                        "`Set 🏷️ " + choice.region + "`",
                        "`Type 🔖 " + choice.type + "`",
                        "`Rarity ⭐ " + choice.rarityRef + "`"
                    ].join('\n')
                        , true)
                    .setImage(choice.assets[0].gameAbsolutePath)
                    .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setColor('RANDOM')
                    .setTimestamp();

                await message.channel.send(cardEmbed);
            }).catch(err => {
                message.channel.send(`${message.author.username}, found nothing . . .`);
            });
        } else {
            await message.channel.send({
                embed: {
                    title: card.response.card[0].name,
                    thumbnail: { url: `https://dd.b.pvp.net/latest/core/en_us/img/regions/icon-${card.response.card[0].regionRef.toLowerCase()}.png` },
                    description: `${card.response.card[0].flavorText}`,
                    fields: [
                        {
                            name: 'Stats', value: [
                                "`Cost 💎 " + card.response.card[0].cost + "`",
                                "`Attack 🗡️ " + card.response.card[0].attack + "`",
                                "`Health ♥ " + card.response.card[0].health + "`",
                                "`Set 🏷️ " + card.response.card[0].region + "`",
                                "`Type 🔖 " + card.response.card[0].type + "`",
                                "`Rarity ⭐ " + card.response.card[0].rarityRef + "`"
                            ].join('\n')
                        }
                    ],
                    image: { url: card.response.card[0].assets[0].gameAbsolutePath },
                    footer: { text: 'Requested by ' + message.author.username, icon_url: message.author.displayAvatarURL() },
                    timestamp: new Date(),
                    color: 'RANDOM',
                }
            });
        }
    }
}