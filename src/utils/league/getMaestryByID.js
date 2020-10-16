require('dotenv').config();
const { LolApi } = require('twisted');
const api = new LolApi({ key: process.env.LOL_API_KEY });

async function getMaestryByID(summonerId, region) {

    const { score } = await api.Champion.championsScore(summonerId, region);

    const res = await api.Champion.masteryBySummoner(summonerId, region).then(data => data.response.slice(0, 5));

    let names = [];

    for await(r of res) {
        await api.DataDragon.getChampion(r.championId).then(data => names.push(data.name));
    }
    
    return {
        score: score,
        names: names,
        maestries: res
    }

}

module.exports = { getMaestryByID };