const BaseCommand = require('../../utils/structures/BaseCommand');
const fetch = require('node-fetch');
const url = 'https://pokeapi.co/api/v2/pokemon/';
require('dotenv').config();
module.exports = class Pokemon extends BaseCommand {

    constructor() {
        super('pokemon', 'fun', true, 'Shows information of a pokemon', '< name >', 5);
    }

    async run(client, message, cmdArgs) {

        let msg = await message.channel.send('Searching . . . ');

        let pokemon = await fetch(`${url}/${cmdArgs.join(' ')}`).then(data => data.json())
            .catch(err => { throw `No results for ${cmdArgs.join(' ')}` });
        await msg.edit({
            embed: {
                title: `${pokemon.name.toUpperCase()}`,
                description: '```\n```',
                image: { url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` },
                color: 'RANDOM'
            }
        });

    }

}