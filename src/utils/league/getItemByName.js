const fetch = require('node-fetch');
const { getItemList } = require('./getItemList');

async function getItemByName(name) {
    const list = await getItemList();

    const card = list.response.itemList.filter(c => { return c[1].name.toLowerCase() === name });

    if(card.length === 0) { throw `No results for "${name}"` } 

    return {
        response: {
            card: card[0]
        }
    }
}

module.exports = { getItemByName };