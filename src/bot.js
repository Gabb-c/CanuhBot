const { Client } = require('discord.js');
const { Manager } = require('erela.js');
const client = new Client();
const raven = require('raven');
require('dotenv').config();

client.manager = new Manager({
  nodes: [
    {
      host: process.env.HOST,
      port: Number.parseInt(process.env.PORT),
      password: process.env.PASSWORD,
      secure: false,
    },
  ],

  autoPlay: true,

  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});

const {
  registerCommands,
  registerDiscordEvents,
  registerMusicEvents,
  registerProcessEvents,
} = require('./utils/discord-functions/register');

raven
  .config(process.env.SENTRY_KEY, {
    captureUnhandledRejections: true,
  })
  .install();

(async () => {
  await client.login(process.env.BOT_TOKEN);
})();

(async () => {
  client.commands = new Map();
  await registerCommands(client, '../../commands');
  await registerMusicEvents(client.manager, '../../events/music-events');
  await registerDiscordEvents(client, '../../events/discord-events');
  await registerProcessEvents('../../events/process');
})();