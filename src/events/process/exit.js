const BaseEvent = require('../../utils/structures/BaseEvent')
const boxen = require('boxen');

module.exports = class Exit extends BaseEvent {
    constructor () {
        super('exit');
    }

    async run(code) {
        console.log(boxen(`Exit code: ${code}`, { padding: 1, borderColor: "red" }));
    
    }
}