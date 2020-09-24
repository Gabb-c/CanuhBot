require('dotenv').config();
const { LolApi, Constants } = require('twisted');
const api = new LolApi( { key: process.env.LOL_API_KEY } );
const { getVersion } = require('./getVersion');
const { getRankedByName } = require('./getRankedByName');

async function getSummonerByName(nickname, region) {

    const player = await api.Summoner.getByName(nickname, region).catch(err => { throw `No results for ${nickname} at ${region}` });
    const maestery = await api.Champion.masteryBySummoner(player.response.id, region).catch(err => { throw `No results for ${nickname} at ${region}` });
    const ranked = await getRankedByName(player.response.id, region).catch(err => { throw `No ranked results for ${nickname} at ${region}` });
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
        ranked: ranked
    }

}

module.exports = { getSummonerByName };