const fetch = require('node-fetch');

async function getVersion() {

    const list = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(response => response.json())
                                                                                     .catch(err => { throw 'Cannot get LOL API version . . .' })
    
    return {
        latest: list[0],
        full: list
    }
    

}

module.exports = { getVersion };