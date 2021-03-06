const path = require('path');
const fs = require('fs').promises;
const BaseEvent = require('../../utils/structures/BaseEvent');
const BaseCommand = require('../../utils/structures/BaseCommand');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    stat.isDirectory() ? registerCommands(client, path.join(dir, file)) : null;
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));

      if (Command.prototype instanceof BaseCommand) {
        const command = new Command();
        await client.commands.set(command.name, command);
      }
    }
  }
}

async function registerDiscordEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    stat.isDirectory() ? registerDiscordEvents(client, path.join(dir, file)) : null;
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));

      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

async function registerMusicEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    stat.isDirectory() ? registerMusicEvents(client, path.join(dir, file)) : null;
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));

      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

async function registerProcessEvents(dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    stat.isDirectory() ? registerProcessEvents(process, path.join(dir, file)) : null;
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));

      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        process.on(event.name, event.run.bind(event));
      }
    }
  }
}

module.exports = {
  registerDiscordEvents,
  registerCommands,
  registerMusicEvents,
  registerProcessEvents,
};
