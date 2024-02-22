const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }
  static get idColumn() {
    return "id";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: {type: "string"},
      },
    };
  }
}

module.exports = User;