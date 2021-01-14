const BaseCommand = require('../../utils/structures/BaseCommand');
require('dotenv').config();

module.exports = class Skip extends BaseCommand {
    constructor() {
        super('skip', 'music', false, 'Skip to the next music!', '', 5);
    }

    async run(client, message, cmdArgs, player) {
        console.log(client.manager);
    }
       
}