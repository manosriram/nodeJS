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
    type: Number,
    required: true
  },
  place: {
    type: String
  },
  occupation: {
    type: String,
    required: true
  }
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
