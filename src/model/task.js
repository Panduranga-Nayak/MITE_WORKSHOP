const knex = require("../db/mysql");
const { Model } = require("objection");

class Task extends Model {
  static get tableName() {
    return "task";
  }
  static get idColumn() {
    return "id";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        description: { type: "string" },
        completed: { type: "boolean" },
        owner: {type: "integer"},
      },
    };
  }
}

module.exports = Task;