const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  place: {
    type: String
  },
  occupation: {
    type: String
  }
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
