const fetch = require('node-fetch');
const { getItemList } = require('./getItemList');
const { getVersion } = require('./getVersion');

async function getItemByName(name) {
    const list = await getItemList();

    const card = list.response.itemList.filter(c => { return c[1].name.toLowerCase() === name });
    const { latest } = await getVersion();

    if (card.length === 0) { throw `No results for "${name}"` }

    return {
        response: {
            card: card[0],
            image: `http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${card[0][1].image.full}`
        }
    }
}

module.exports = { getItemByName };