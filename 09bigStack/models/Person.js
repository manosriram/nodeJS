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
<<<<<<< HEAD
=======
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
>>>>>>> 09bd1ce9b570a08e53db35c4d0f8629e56a40260
  }
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
