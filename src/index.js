const { ShardingManager } = require("discord.js");
require('dotenv').config();
const manager = new ShardingManager("./bot.js", { token: process.env.BOT_TOKEN, totalShards: "auto" });
const boxen = require('boxen');

manager.on("shardCreate", shard => {
  console.log(boxen('New shard created!', { padding: 1, borderColor: '#ff0883' }));
});

(async () => {
  await manager.spawn();
})();
