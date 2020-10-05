const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

module.exports = class HeroCard extends BaseCommand {
    constructor () {
        super('hshero', 'info', true, 'Shows information of a Hearthstone hero card!', '< card_name >', 5);
    }

    async run(client, message, cmdArgs) {
        await message.channel.send("Searching . . . 🔎");

        const result = await fetch(process.env.HS_API + cmdArgs.join(' '), {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": process.env.HS_HOST,
		        "x-rapidapi-key": process.env.HS_KEY
	        }
        });

        if(result.status != 200) throw `${message.author.username}, no results for "${cmdArgs.join(' ')}"`;

        let jsonResult = await result.json();

        let card = await jsonResult.filter(element => {
            return element.type === 'Hero' && element.collectible === true && !(element.rarity === 'Free');
        });
        
        if(card.length == '') throw `${message.author.username}, this command is only for hero cards . . .`;

        let embed = new MessageEmbed()
            .setColor('#800080')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

        if(card.length > 1) {
            embed.setTitle(`Results for ${cmdArgs.join(' ')}`);

            card.forEach((element, key) => {
                embed.addField(`${key + 1}) ${element.name} | ${element.cardId}`, [
                    "`Cost 💎: " + element.cost + "`",
                    "`Health ♥: " + element.health + "`",
                    "`Armor 🛡️: " + element.armor + "`",
                    "`Card Set 🏷️: " + element.cardSet + "`",
                    "`Rarity ⭐: " + element.rarity + "`",
                    "`Class 📜: " + element.playerClass + "`"
                ].join('\n')
                , true);
            });

            message.channel.send(embed).then(() => {
                const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= card.length);

                message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(collected => {
                        const entry = collected.first().content;
                        const choice = card[entry-1];
                        let cardEmbed = new MessageEmbed()
                           .setTitle(`${choice.name} | ${choice.cardId}`)
                           .setDescription(choice.flavor)
                           .addField('Stats', [
                                "`Cost 💎: " + choice.cost + "`",
                                "`Health ♥: " + choice.health + "`",
                                "`Armor 🛡️: " + choice.armor + "`",
                                "`Card Set 🏷️: " + choice.cardSet + "`",
                                "`Rarity ⭐: " + choice.rarity + "`",
                                "`Class 📜: " + choice.playerClass + "`"
                            ].join('\n')
                            , true)
                           .setImage(`${process.env.HS_IMG_API}${choice.cardId}.png`)
                           .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                           .setColor('#800080')
                           .setTimestamp();
                        message.channel.send(cardEmbed);
                }).catch(err => {
                    message.channel.send(`${message.author.username}, time's over . . .`);
                });
                
            });

        } else {
            embed.setTitle(`${card[0].name} | ${card[0].cardId}`)
                 .setImage(`${process.env.HS_IMG_API}${card[0].cardId}.png`)
                 .setDescription(card[0].flavor)
                 .addField('Stats', [
                    "`Cost 💎: " + card[0].cost + "`",
                    "`Health ♥: " + card[0].health + "`",
                    "`Armor 🛡️: " + card[0].armor + "`",
                    "`Card Set 🏷️: " + card[0].cardSet + "`",
                    "`Rarity ⭐: " + card[0].rarity + "`",
                    "`Class 📜: " + card[0].playerClass + "`"
                ].join('\n')
                , true);
            message.channel.send(embed);
        }
    }
    
}

/*
https://art.hearthstonejson.com/v1/render/latest/{LOCALE}/{RESOLUTION}/{CARD_ID}.{EXT}

LOCALE: The Hearthstone locale (eg. enUS, frFR, …). A full list of locales is available in enums.json
RESOLUTION: 256x or 512x for 256px or 512px in width. Height is currently 1.5x the width, but that may change in future patches if cards gain new assets.
CARD_ID: The card’s cardId, as with the other APIs
EXT: The format extension. Only png is currently available, but webp is on the wishlist.
*/