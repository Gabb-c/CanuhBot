const BaseCommand = require('../../../utils/structures/BaseCommand');
const { getItemList } = require('../../../utils/league/getItemList');
const itemTags = require('../../../utils/league/itemTags');

module.exports = class ItemList extends BaseCommand {
    constructor() {
        super('itemlist', 'info', false, 'Shows itens by category', '< name >', 5);
    }

    async run(client, message, cmdArgs) {

        await message.channel.send({
            embed: {
                title: 'Choose a category',
                description: itemTags.map((item, key) => `${key + 1}) ${item.name}`).join('\n'),
                footer: {
                    text: 'Requested by ' + message.author.username,
                    icon_url: message.author.displayAvatarURL(),
                },
                timestamp: new Date(),
                color: '#800080'
            }
        });

        const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= itemTags.length);

        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
            const entry = collected.first().content;
            const choice = itemTags[entry - 1];

            let msg = await message.channel.send('Searching . . . 🔎');

            const list = await getItemList().then(data => data.response.itemList.filter(i => { return i[1].tags.includes(choice.cod) && i[1].purchasable !== true && i[1].inStore !== false }));
            console.log(list);

            await msg.edit({
                embed: {
                    title: `${choice.name} items`,
                    description: list.map(i => `${i[1].name}`).join('\n'),
                    footer: {
                        text: 'Requested by ' + message.author.username,
                        icon_url: message.author.displayAvatarURL(),
                    },
                    timestamp: new Date(),
                    color: '#800080'
                }
            });

        }).catch(err => {
            message.channel.send(`${message.author.username}, ${err} . . .`);
        });
    }
}