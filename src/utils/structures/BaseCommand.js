module.exports = class BaseCommand {
  constructor(name, category, args, description, structure, cooldown) {
    this.name = name;
    this.category = category;
    this.args = args;
    this.description = description;
    this.structure = structure;
    this.cooldown = cooldown;
  }
};
