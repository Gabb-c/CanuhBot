const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');


module.exports = class Urban extends BaseCommand {

    constructor() {

        super('urban', 'info', true, 'A search on Urban Dictionary', '!urban <word>');
    
    }

    async run(client, message, cmdArgs) {

        let msg =  await message.channel.send("Searching . . .");

        const query = querystring.stringify({ term: cmdArgs.join(' ') });

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        console.log(list);
  
        if(!list.length) {
            throw new Error(`No results for "${cmdArgs.join(' ')}"`);
        } else {
            msg.edit({ embed: {
                title: `${list[0].word}`,
                fields: [
                    { name: 'Definition: ', value: `${list[0].definition}` },
                    { name: 'Examples: ', value: `${list[0].example}` },
                    { name: 'Rating: ', value: `${list[0].thumbs_up} thumbs up \n ${list[0].thumbs_down} thumbs down` }
                ],
                footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL() },
                timestamp: new Date(),
                color: '#800080'
            }});
        }
    }

}