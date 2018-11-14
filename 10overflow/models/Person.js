const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
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
  },
  follows: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
      }
    }
  ],
  followers: [
    {
<<<<<<< HEAD
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
=======
      follow: {
        type: String
>>>>>>> 2e9c1b72046f9940f875e680d5a99208d724b2ca
      }
    }
  ]
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
