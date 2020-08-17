const { Client } = require('discord.js');
const client = new Client;
require('dotenv').config();
const {
    registerCommands,
    registerEvents
} = require('./utils/register');

(async () => await client.login(process.env.BOT_TOKEN))();

(async () => {
    client.commands = new Map;
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    console.log(client.commands);
})();