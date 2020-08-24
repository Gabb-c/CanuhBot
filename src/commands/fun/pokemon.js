const BaseCommand = require('../../utils/structures/BaseCommand');
const fetch = require('node-fetch');
const url = 'https://pokeapi.co/api/v2/pokemon/';

module.exports = class Pokemon extends BaseCommand {

    constructor() {
        super('pokemon', 'fun', true, 'Shows information of a pokemon', '!pokemon <pokemon_name>');
    }

    async run(client, message, cmdArgs) {

        let msg = await message.channel.send('Searching . . . ');

        let result = await fetch(`${url}/${cmdArgs.join(' ')}`);
        
        if(result.status != 200) {
            throw new Error(`No results for ${cmdArgs}`);
        }
        else {
            let pokemon = await result.json();

            msg.edit({ embed: {
                title: `${pokemon.name.toUpperCase()}`,
                image: { url: `${pokemon.sprites.front_default}` },
                fields: [
                    { name: 'Abilities', value: `${pokemon.abilities.map((a) => a.ability.name).join('\n')}` }
                ],
                color: '#800080'
            }});
        }



    }

}