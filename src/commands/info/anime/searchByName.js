require('dotenv').config();
const BaseCommand = require('../../../utils/structures/BaseCommand');
const search = require('mal-scraper').search;

module.exports = class AnimeByName extends BaseCommand {
    constructor() {
        super('anime', 'info', true, 'Shows info of an anime', '< name >', 5);
    }

    async run(client, message, cmdArgs) {
        let msg = await message.channel.send('Searching . . . 🔎');

        const res = await search.search('anime', { term: cmdArgs.join(' ') })
                                .then(data => data.slice(0, 18))
                                .catch(() => { throw `${message.author.username}, no results for ${cmdArgs.join(' ')}` });
        
        await msg.edit({ embed: {
            title: `Results for ${cmdArgs.join(' ')}`,
            description: [
                res.map((anime, key) => `${key + 1}) ${anime.title} | ${anime.type}`).join('\n')
            ].join('\n'),
            color: '#800080',
            footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
            timestamp: new Date()
        }});

        const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= res.length);

        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
            const entry = collected.first().content;
            const choice = res[entry-1];
            let cmsg = await message.channel.send('Searching . . . 🔎');

            await cmsg.edit({ embed: {
                title: `${choice.title}   |   ${choice.type}`,
                fields: [
                    { name: 'Description', value: choice.shortDescription.replace('...read more.', '') + `[...read more](${choice.url} 'Click for more information for ${choice.title}')`, inline: false },
                    { name: 'Episodes', value: choice.nbEps, inline: false },
                    { name: 'Start Date', value: choice.startDate, inline: false },
                    { name: 'End Date', value: choice.endDate, inline: false },
                    { name: 'Score', value: choice.score, inline: false },
                    { name: 'Members', value: choice.members, inline: false }
                ],
                thumbnail: { url: choice.thumbnail },
                color: '#800080',
                footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
                timestamp: new Date(),
            }});
        }).catch(err => {
            message.channel.send(`${message.author.username}, time's over . . .`);
        });
    }

    async getName() { return this.name }
}
