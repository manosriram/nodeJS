const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myPerson"
  },
  text1: {
    type: String,
    required: true
  },
  text2: {
    type: String,
    required: false
  },
  named: {
    type: String
  },
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
      }
    }
  ],

  count: {
    type: Number
  },

  answers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Questions = mongoose.model("myQuestion", QuestionSchema);