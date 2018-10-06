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
    type: String
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8586ef33e30645f8048767f1ac8e7f5ea1aa9606
  }
=======
  },
>>>>>>> 7521746012cc393c8738e6430313dd70c2f4712f
=======
  }
>>>>>>> d44f32aa4545a7e589af5c448677e2c8a5eaa4ad
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
