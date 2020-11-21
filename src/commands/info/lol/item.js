const BaseCommand = require('../../../utils/structures/BaseCommand');
const { getItemByName } = require('../../../utils/league/getItemByName');

module.exports = class Item extends BaseCommand {
    constructor() {
        super('item', 'info', true, 'Shows info of an LoL item', '< name >', 5);
    }

    async run(client, message, cmdArgs) {
        let msg = await message.channel.send('Searching . . . 🔎');

        const card = await getItemByName(cmdArgs.join(' '));

        await msg.edit({
            embed: {
                title: card.response.card[1].name,
                thumbnail: { url: card.response.image },
                description: card.response.card[1].plaintext,
                fields: [
                    { name: 'Stats', value: [
                        card.response.card[1].description.replace(/<[^>]*>/g, '  ')
                    ].join('\n')},

                    { name: 'Gold', value: [
                        `\`Total  ${card.response.card[1].gold.total} 💰\``,
                        `\`Sell  ${card.response.card[1].gold.sell} 💰\``
                    ].join('\n')}
                ],
                color: '#800080',
                footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
                timestamp: new Date()
            }
        });
    }
}