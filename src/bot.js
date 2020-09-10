const { Client } = require('discord.js');
const { ErelaClient } = require('erela.js');;
const client = new Client;
const raven = require('raven');
require('dotenv').config();

const {
    registerCommands,
    registerDiscordEvents,
    registerMusicEvents,
    registerProcessEvents
} = require('./utils/register');

raven.config(process.env.SENTRY_KEY, {
    captureUnhandledRejections: true
}).install();

(async () => {
    await client.login(process.env.BOT_TOKEN);
    client.music = new ErelaClient(client, [
        {
            host: process.env.HOST,
            port: process.env.PORT,
            password: process.env.PASSWORD
        }
    ]);
    await registerMusicEvents(client.music, '../events/music-events');
})();

(async () => {
    client.commands = new Map;
    await registerCommands(client, '../commands');
    await registerDiscordEvents(client, '../events/discord-events');
    await registerProcessEvents('../events/process');
})();

