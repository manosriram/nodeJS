const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    default: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  profilePic: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: undefined
  }
  // post: {
  //   type: String,
  //   required: false
  // }
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
