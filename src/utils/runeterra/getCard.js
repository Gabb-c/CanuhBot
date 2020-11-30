const { getSet } = require('./getSet');

async function getCard(name) {
    const set = await getSet()
        .then(data => data.response.set.filter(c => { return c.name.toLowerCase() === name }));

    if(set.length === 0) throw `No results for "${name}"`

    return {
        response: {
            card: set
        }
    }
}

module.exports = { getCard };