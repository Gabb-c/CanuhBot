const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();

module.exports = class Skip extends BaseCommand {
    constructor() {
        super('skip', 'music', false, 'Skip to the next music!', '', 5);
    }

    async run(client, message, cmdArgs, player) {
        const players = new Map(client.manager.players);

        const actual = players.get(message.guild.id);
        console.log(actual)

        actual.play();
    }

}