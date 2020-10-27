const fetch = require('node-fetch');
const { getVersion } = require('./getVersion');

async function getItemList() {
    const { latest } = await getVersion();

    const { data } = await fetch(`http://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/item.json`)
        .then(response => response.json())
        .catch(err => { throw 'Could not get any item . . .' });
    
    const itemList = Object.entries(data);
    
    return {
        response: {
            itemList: itemList
        }
    }

}

module.exports = { getItemList };