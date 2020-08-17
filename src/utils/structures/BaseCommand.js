module.exports = class BaseCommand {

    constructor (name, category, args, description, structure) {
        this.name = name;
        this.category = category;
        this.args = args;
        this.description = description;
        this.structure = structure;;
    }
    
}