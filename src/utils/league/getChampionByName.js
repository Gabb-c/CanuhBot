require('dotenv').config();
const { LolApi } = require('twisted');
const api = new LolApi( { key: process.env.LOL_API_KEY } );
const { getVersion } = require('./getVersion');


async function getChampionByName(champion) {

    const champ = await api.DataDragon.getChampion(champion).catch(err => { throw `No results for ${champion}` });
    const version = await getVersion();
    const imgUrl = `http://ddragon.leagueoflegends.com/cdn/${version.latest}/img/champion/`;
    

    return {
        name: champ.name,
        id: champ.id,
        info: champ.info,
        title: champ.title,
        lore: champ.blurb,
        skins: champ.skins,
        image: imgUrl + champ.image.full,  
        splash: process.env.LOL_SPLASH_URL + champ.id + '_0.jpg', 
        stats: champ.stats,
        partype: champ.partype,
        passive: champ.passive,
        spells: champ.spells            
    }

}

module.exports = { getChampionByName };