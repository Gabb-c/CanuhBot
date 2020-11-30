require('dotenv').config();
const { LolApi } = require('twisted');
const api = new LolApi({ key: process.env.LOL_API_KEY });

async function getStatusByShard(shard) {
  const status = await api.Status.get(shard).catch(err => {
    throw 'Cannot ping this server . . .';
  });

  return {
    services: status.response.services,
    hostname: status.response.hostname,
    locales: status.response.locales,
    tag: status.response.region_tag,
    slug: status.response.slug,
  };
}

module.exports = { getStatusByShard };
