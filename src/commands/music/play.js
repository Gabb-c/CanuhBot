const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
module.exports = class Play extends BaseCommand {
    constructor() {
        super('play', 'music', true, 'Play some music!', '< music_name >', 5);
    }

    async run(client, message, cmdArgs) {
        if (message.member.voice.channel === null) throw `${message.author.username}, please join in a voice channel first . . .`;
        console.log(message.author);

        let msg = await message.channel.send('Searching . . . 🔎');

        const res = await client.manager.search(
            cmdArgs.join(' '),
            message.author
        );

        console.log(res);

        if (res.loadType === 'NO_MATCHES') throw `I'm sorry ${message.author.username}, couldn't find any songs .-.`

        await msg.edit({
            embed: {
                title: '**Choose your song**',
                description: [
                    res.tracks.map((song, key) => `${key + 1}) ${song.title}`).join('\n'),
                ].join('\n'),
                footer: { text: 'Requested by ' + message.author.username, icon_url: message.author.displayAvatarURL() },
                timestamp: new Date(),
                color: '#800080',
            }
        });

        const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= res.tracks.length);

        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(async collected => {
            const entry = collected.first().content;
            const choice = res.tracks[entry - 1];

            const player = await client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id
            });

            !player.playing ? await player.connect() : null;

            player.queue.add(choice);
            message.channel.send({
                embed: {
                    title: '**E N Q U E U I N G   T R A C K**   🎵',
                    description: `**Title:** ${choice.title}
                          **Author:** ${choice.author}
                          **URL:** ${choice.uri}`,
                    thumbnail: { url: choice.thumbnail },
                    color: '#800080',
                    footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
                    timestamp: new Date()
                }
            });

            !player.playing && !player.paused && !player.queue.length ? await player.play() : null;

            // For playlists
            !player.playing && !player.paused && player.queue.size === res.tracks.length ? player.play() : null;

        }).catch(err => {
            message.channel.send(`${message.author.username}, time's over . . .`);
        });

    }
}