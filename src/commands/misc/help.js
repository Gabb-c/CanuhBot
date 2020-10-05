const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = class help extends BaseCommand {
  constructor() {
    super(
      'help',
      'info',
      false,
      'Shows information about the bot fuctionalities!',
      '< command_name >',
      5
    );
  }

  async run(client, message, cmdArgs) {
    let command = client.commands.get(cmdArgs.toString());
    let cmdArray = Array.from(client.commands, cmd => cmd[1]);
    let cmdCategory = Array.from(
      new Set(
        cmdArray.map(element => {
          return element.category;
        })
      )
    );

    let msg = await message.channel.send('Searching for help . . . 🔎');

    if (command) {
      await msg.edit({
        embed: {
          title: command.name.toUpperCase(),
          description: [
            `${command.description}`,
            `\`${process.env.BOT_PREFIX + command.name} ${command.structure}\``,
          ].join('\n'),
          footer: {
            text: 'Requested by ' + message.author.username,
            icon_url: message.author.displayAvatarURL(),
          },
          timestamp: new Date(),
          color: '#800080',
        },
      });
    } else {
      await msg.edit({
        embed: {
          title: 'Choose a command category 📚',
          description: [
            cmdCategory.map((cmd, key) => `\`${key + 1}) ${cmd}\``).join('\n'),
          ].join('\n'),
          footer: {
            text: 'Requested by ' + message.author.username,
            icon_url: message.author.displayAvatarURL(),
          },
          timestamp: new Date(),
          color: '#800080',
        },
      });

      const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= cmdCategory.length);

      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
        const entry = collected.first().content;
        const choice = cmdCategory[entry - 1];
        const choiceCmds = cmdArray.filter(c => {
          return c.category == choice;
        });

        await message.channel.send('Searching . . . 🔎');

        let embed = new MessageEmbed()
          .setTitle(choice.toUpperCase())
          .setColor('#800080')
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

        choiceCmds.forEach(c => {

          embed.addField(c.name.toUpperCase(), [
            `${c.description} \n ${process.env.BOT_PREFIX + c.name} ${c.structure}`
          ].join('\n'), true)

        });
        await message.channel.send(embed);

      }).catch(err => {
        message.channel.send(`${message.author.username}, time's over . . .`);
      });

    }
  }
};
