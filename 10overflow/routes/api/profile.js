const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

const Person = require("../../models/Person");
const Profile = require("../../models/Profile");

// router.get(
//   "/delete",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const email = req.body.email;
//     Person.findOne({ email })
//       .then(person => {
//         if (!person) {
//           return res
//             .status(404)
//             .json({ authError: "Please Login to access data.." });
//         } else {
//           res.render("delete", { person: person });
//         }
//       })
//       .catch(err => console.log(err));
//   }
// );

router.get("/delete", (req, res) => {
  if (req.session.id) {
    console.log(req.session.cookie);
    return res.send("Yes!");
  }

  res.send("Not Logged In!!");
  // console.log(req.session.id);
});

// @type    POST
//@route    /api/profile/
// @desc    route for delete an user account
// @access  PRIVATE

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id });
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        Person.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: "delete was a success" }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
