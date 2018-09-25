const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  profilepic: {
    type: String,
    default: "https://image.flaticon.com/icons/svg/23/23716.svg"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
