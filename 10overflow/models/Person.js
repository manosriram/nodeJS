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
      follow: {
        type: String
      }
    }
  ]
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
