const BaseCommand = require('../../utils/structures/BaseCommand');
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config();


module.exports = class Urban extends BaseCommand {

    constructor() {

        super('urban', 'info', true, 'A search on Urban Dictionary', `${process.env.BOT_PREFIX}urban  < word >`, 5);

    }

    async run(client, message, cmdArgs) {

        let msg = await message.channel.send("Searching . . . 🔎");

        const info = await this.getDefinition(cmdArgs.join(' '));

        msg.edit({
            embed: {
                title: `${info.word}`,
                description: info.definition,
                fields: [
                    { name: 'Examples: ', value: `${info.example}` },
                    { name: 'Rating: ', value: `${info.thumbsUp} thumbs up \n ${info.thumbsDown} thumbs down` }
                ],
                footer: { text: "Requested by " + message.author.username, icon_url: message.author.displayAvatarURL() },
                thumbnail: { url: 'http://i.imgur.com/CcIZZsa.png' },
                timestamp: new Date(),
                color: '#800080'
            }
        });
    }

    async getDefinition(term) {
        const query = querystring.stringify({ term: term });

        const { list: [word] } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        if (!word) throw `No results for "${term}"`;

        return {
            definition: word.definition.length >= 1984 ? `${word.definition.substr(0, 1984)}...` : word.definition,
            word: word.word,
            link: word.permalink,
            thumbsUp: word.thumbs_up,
            thumbsDown: word.thumbs_down,
            example: word.example,
            author: word.author
        };

    }
}