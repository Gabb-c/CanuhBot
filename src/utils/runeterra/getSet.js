const fetch = require('node-fetch');

async function getSet() {
    const setList = ['set1', 'set2', 'set3'];

    let sets = [];

    for await (s of setList) {
        let res = await fetch(`https://dd.b.pvp.net/latest/${s}/en_us/data/${s}-en_us.json`)
            .then(data => data.json())
            .catch(() => { throw `No set founded . . .` });
        Array.prototype.push.apply(sets, res);
    }

    const globals = await fetch('https://dd.b.pvp.net/latest/core/en_us/data/globals-en_us.json')
        .then(data => data.json())
        .catch(() => { throw 'Globals not founded . . .' });

    return {
        response: {
            set: sets,
            globals: globals
        }
    }
}

module.exports = { getSet };

// https://dd.b.pvp.net/latest/core/${locale}/data/globals-${locale}.json
// https://dd.b.pvp.net/latest/core/${locale}/img/regions/icon-${region}.png
// https://dd.b.pvp.net/latest/${set}/${locale}/data/${set}-${locale}.json