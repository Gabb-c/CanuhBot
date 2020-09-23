require('dotenv').config();
const { LolApi, Constants } = require('twisted');
const api = new LolApi( { key: process.env.LOL_API_KEY } );

async function getRankedByName(id, region) {

    const data = api.League.bySummoner(id, region).catch(err => { throw `No results for ${nickname} at ${region}` });

    const flex = (await data).response.filter(element => {
        return element.queueType === 'RANKED_FLEX_SR';
    });

    const soloDuo = (await data).response.filter(element => {
        return element.queueType === 'RANKED_SOLO_5x5';
    });

    return {
        soloDuo: {
            tier: soloDuo == '' ? 'UNRANKED' : soloDuo[0].tier,
            rank: soloDuo == '' ? '0' : soloDuo[0].rank,
            lp: soloDuo == '' ? '0' : soloDuo[0].leaguePoints,
            wins: soloDuo == '' ? '0' : soloDuo[0].wins,
            losses: soloDuo == '' ? '0' : soloDuo[0].losses
        },
        flex: {
            tier: flex == '' ? 'UNRANKED' : flex[0].tier,
            rank: flex == '' ? '0' : flex[0].rank,
            lp: flex == '' ? '0' : flex[0].leaguePoints,
            wins: flex == '' ? '0' : flex[0].wins,
            losses: flex == '' ? '0' : flex[0].losses
        }
    }

}

module.exports = { getRankedByName };