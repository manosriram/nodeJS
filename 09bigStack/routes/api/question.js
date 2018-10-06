const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
// Load Question Model...
const Question = require("../../models/Question");

// Load Person Model...
const Person = require("../../models/Person");

// Load Profile Model...
const Profile = require("../../models/Profile");

// router.get("/", (req, res) => {
//   res.json({
//     question: "Questions Not Yet Ready.."
//   });
// });

// @type  POST
// @route /api/questions/
// @desc  route for posting a question
// @access PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuestion = new Question({
      user: req.user.id,
      text1: req.body.text1,
      text2: req.body.text2
    });
    newQuestion
      .save()
      .then(question => res.json(question))
      .catch(err => console.log(err));

    Question.findOne({ user: req.user.id })
      .then(person => {
        if (!person)
          res
            .status(404)
            .json({ authenticationError: "User Not Logged In..." });
      })
      .catch();
  }
);

// @type  GET
// @route /api/questions/all
// @desc  route for getting all the questions..
// @access PUBLIC

router.get("/all", (req, res) => {
  Question.find()
    .sort("-date")
    .then(questions => {
      if (!questions)
        res
          .status(404)
          .json({ questionsError: "No Questions in the Database..." });

      res.json(questions);
    })
    .catch(err => console.log(err));
});

// @type  DELETE
// @route /api/questions/
// @desc  route for deleting a question asked by that user itself
// @access PRIVATE

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Question.findOne({ _id: req.user.id });
    Question.findByIdAndRemove({ _id: req.user.id })
      .then(
        Question.findOneAndDelete({ _id: req.user.id })
          .then(res.json({ success: "Question Deleted!!" }))
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err));
  }
);

// @type  POST
// @route /api/questions/answers/:id
// @desc  route for answering a question...
// @access PRIVATE

router.post(
  "/answers/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findById(req.params.id)
      .then(question => {
        const newAnswer = {
          user: req.user.id,
          name: req.body.name,
          text: req.body.text
        };
        question.answers.unshift(newAnswer);
        question
          .save()
          .then(question => res.json(question))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

// @type  POST
// @route /api/questions/upvote/:id
// @desc  route for upvoting a question
// @access PRIVATE

router.post(
  "/upvote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Question.findById(req.params.id)
          .then(question => {
            if (
              question.upvotes.filter(
                upvote => upvote.user.toString() === req.user.id.toString()
              ).length > 0
            ) {
              question.upvotes.shift({ user: req.user.id });
              question.count = question.upvotes.length;
              question
                .save()
                .then(question => res.json(question))
                .catch(err => console.log(err));

              return res
                .status(400)
                .json({ upvoteRemoved: "Your Upvote has been removed!!" });
            }
            question.upvotes.unshift({ user: req.user.id });
            question.count = question.upvotes.length;
            question
              .save()
              .then(question => res.json(question))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
