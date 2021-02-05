const { LolApi } = require('twisted');
const api = new LolApi();

async function getVersion() {
  const list = await api.DataDragon.getVersions().catch(() => { throw `Could not get Lol API versions . . .` })

  return {
    latest: list[0],
    full: list,
  };
}

module.exports = { getVersion };
