require('dotenv').config();
const { LolApi } = require('twisted');
const api = new LolApi();
const { getVersion } = require('./getVersion');

async function getChampionByName(champion) {
  const champ = await api.DataDragon.getChampion(champion).catch(err => {
    throw `No results for ${champion}`;
  });

  const version = await (await getVersion()).latest;
  const imgUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;

  return {
    name: champ.name,
    id: champ.id,
    info: champ.info,
    title: champ.title,
    lore: champ.blurb,
    fullLore: `https://universe.leagueoflegends.com/en_US/story/champion/${champ.id.toLowerCase()}/`,
    skins: champ.skins,
    image: imgUrl + champ.image.full,
    splash: process.env.LOL_SPLASH_URL + champ.id + '_0.jpg',
    stats: champ.stats,
    partype: champ.partype,
    passive: champ.passive,
    spells: champ.spells
  };
}

module.exports = { getChampionByName };
