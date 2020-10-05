const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');

module.exports = class Play extends BaseCommand {
    constructor() {
        super('play', 'music', true, 'Play some music!', '< music_name >', 5);
    }

    async run(client, message, cmdArgs) {
        const res = await client.manager.search(
            cmdArgs,
            message.author
        );

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id
        });

        await player.connect();

        player.queue.add(res.tracks[0]);
        message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);

        if (!player.playing && !player.paused && !player.queue.length) player.play();

        // For playlists you'll have to use slightly different if statement
        if (
            !player.playing &&
            !player.paused &&
            player.queue.size === res.tracks.length
        )
            player.play();

    }
}