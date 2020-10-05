const BaseCommand = require('../../../utils/structures/BaseCommand');
require('dotenv').config();
const { getChampionByName } = require('../../../utils/league/getChampionByName');

module.exports = class Champion extends BaseCommand {
    constructor () {
        super('champion', 'info', true, 'Shows a lol champion', '< champion >', 5);
    }

    async run(client, message, cmdArgs) {        
        let msg = await message.channel.send('Searching . . . 🔎');
        
        const data = await getChampionByName(cmdArgs.join(' '));

        await msg.edit( { embed: {
            title: `${data.name},  ${data.title}`,
            fields: [

                { name: 'Base Stats:', value: [
                    "`Health ♥: " + data.stats.hp + "`",
                    "`" + data.partype + " 💧: " + data.stats.mp + "`",
                    "`Armor 🛡️: " + data.stats.armor + "`",
                    "`Magic Resist ⭕: " + data.stats.spellblock + "`",
                    "`Attack Damage 🗡️: " + data.stats.attackdamage + "`",
                    "`Attack Range 🏹: " + data.stats.attackrange + "`",
                    "`Crit ⚡: " + data.stats.crit + "`",
                    "`Movespeed ➡: " + data.stats.movespeed + "`"
                ].join('\n')},
                
                { name: `Passive  -  ${data.passive.name}`, value: [
                    "`Description:` " + data.passive.description
                ].join('\n') },

                { name: `Q  -  ${data.spells[0].name}`, value: [
                    "`Description:` " + data.spells[0].description
                ].join('\n') },

                { name: `W  -  ${data.spells[1].name}`, value: [
                    "`Description:` " + data.spells[1].description
                ].join('\n') },

                { name: `E  -  ${data.spells[2].name}`, value: [
                    "`Description:` " + data.spells[2].description
                ].join('\n') },

                { name: `R  -  ${data.spells[3].name}`, value: [
                    "`Description:` " + data.spells[3].description
                ].join('\n') }

            ],
            image: { url: data.splash },
            thumbnail: { url: data.image },
            color: '#800080',
            footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
            timestamp: new Date()
        }});

    }

}