const BaseCommand = require('../../../utils/structures/BaseCommand');
const { getItemList } = require('../../../utils/league/getItemList');
const { getItemByName } = require('../../../utils/league/getItemByName');

module.exports = class Item extends BaseCommand {
    constructor() {
        super('item', 'info', true, 'Shows info of an LoL item', '< name >', 5);
    }

    async run(client, message, cmdArgs) {
        //const item = await getItemList();
        //console.log(item.response.itemList);

        const card = await getItemByName(cmdArgs.join(' '));
        console.log(card.response.card);
    }
}