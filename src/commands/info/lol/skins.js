const BaseCommand = require('../../../utils/structures/BaseCommand');
require('dotenv').config();
const { getChampionByName } = require('../../../utils/league/getChampionByName');
const { MessageEmbed } = require('discord.js');

module.exports = class Skin extends BaseCommand {
    constructor() {
        super('skin', 'info', true, 'Shows a list of skins for a champion', '< champion >', 5);
    }

    async run(client, message, cmdArgs) {

        await message.channel.send('Searching . . . 🔎');

        const data = await getChampionByName(cmdArgs.join(' '));

        let options = new MessageEmbed()
            .setTitle(`${data.name} skins`)
            .setThumbnail(data.image)
            .setDescription( [ data.skins.map((s, key) =>"`" + `${key + 1}) ${s.name}` + "`").join('\n') ] )
            .setColor('#800080')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

        await message.channel.send(options);

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= data.skins.length);

            message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(collected => {
                    const entry = collected.first().content;
                    const choice = data.skins[entry-1];

                    let skinEmbed = new MessageEmbed()
                           .setTitle(`${choice.name}`)
                           .setImage(`${process.env.LOL_SPLASH_URL + data.id}_${choice.num}.jpg`)
                           .setColor('#800080')
                           .setTimestamp()
                           .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
                     message.channel.send(skinEmbed);
            }).catch(err => {
                message.channel.send(`${message.author.username}, nothing founded . . .`);
            });

    }

}