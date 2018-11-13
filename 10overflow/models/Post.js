const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  textArea: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
      }
    }
  ],
  pic: {
    type: String,
    required: false
  },
  id: {
    type: Schema.Types.ObjectId,
    ref: "myPerson"
  }
});

module.exports = Post = mongoose.model("myPost", PostSchema);
