require('dotenv').config();
const { LolApi, Constants } = require('twisted');
const api = new LolApi( { key: process.env.LOL_API_KEY } );
const { getVersion } = require('./getVersion');

async function getSummonerByName(nickname, region) {

    const player = await api.Summoner.getByName(nickname, region).catch(err => { throw `No results for ${nickname} at ${region}` });
    const maestery = await api.Champion.masteryBySummoner(player.response.id, region).catch(err => { throw `No results for ${nickname} at ${region}` });
    const ranked = await api.League.bySummoner(player.response.id, region).catch(err => { throw `No ranked results for ${nickname} at ${region}` });
    const version = await getVersion();
    const iconUrl = `http://ddragon.leagueoflegends.com/cdn/${version.latest}/img/profileicon/`;


    return {
        id: player.response.id,
        name: player.response.name,
        puuid: player.response.puuid,
        accountId: player.response.accountId,
        profileIcon: iconUrl + player.response.profileIconId + ".png",
        summonerLevel: player.response.summonerLevel,
        summonerMastery: maestery.response.slice(0, 5),
        ranked: {
            soloDuo: {
                tier: typeof ranked.response[0] === 'undefined' ? 'Not ranked' : ranked.response[0].tier,
                rank: typeof ranked.response[0] === 'undefined' ? '' : ranked.response[0].rank,
                lp: typeof ranked.response[0] === 'undefined' ? 'no lp' : ranked.response[0].leaguePoints,
                wins: typeof ranked.response[0] === 'undefined' ? '0' : ranked.response[0].wins,
                losses: typeof ranked.response[0] === 'undefined' ? '0' : ranked.response[0].losses
            },
            flex: {
                tier: typeof ranked.response[1] === 'undefined' ? 'Not ranked' : ranked.response[1].tier,
                rank: typeof ranked.response[1] === 'undefined' ? '' : ranked.response[1].rank,
                lp: typeof ranked.response[1] === 'undefined' ? 'no lp' : ranked.response[1].leaguePoints,
                wins: typeof ranked.response[1] === 'undefined' ? '0' : ranked.response[1].wins,
                losses: typeof ranked.response[1] === 'undefined' ? '0' : ranked.response[1].losses
            }
        }
    }

}

module.exports = { getSummonerByName };