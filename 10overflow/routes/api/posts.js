const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");
const Post = require("../../models/Post");
const Person = require("../../models/Person");

router.get("/", (req, res) => {
  res.json({ success: "Posts Home Page!" });
});

// @type -- POST
// @route -- /api/posts/post
// @desc -- Route for Posting a Post.
// @access -- Private

router.post("/post", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      const newPost = new Post({
        title: req.body.title,
        textArea: req.body.textArea,
        id: user.id
      });
      user._id = user.id;
      newPost
        .save()
        .then(post => {
          res.json({ success: "Post Submitted!", id: user.id });
        })
        .catch(err => console.log(err));
    }
  });
});

// @type -- GET
// @route -- /api/posts/post
// @desc -- Route for Post form
// @access -- Private
router.get("/post", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      res.render("post");
    } else {
      res.send("Route cant be accessed!");
    }
  });
});

// @type -- GET
// @route -- /api/posts/getPostInfo
// @desc -- Route for Getting all the posts of the user..
// @access -- PUBLIC

router.get("/showAll", (req, res) => {
  Post.find()
    .then(post => res.json(post))
    .catch(err => console.log(err));
});

// @type -- GET
// @route -- /api/posts/:name
// @desc -- Route for Getting the profile based on username
// @access -- PUBLIC

router.get("/:name", (req, res) => {
  Person.findOne({ name: req.params.name })
    .then(person => {
      if (!person) {
        res.status(404).json({ notFound: "User not found with this name.." });
      } else {
        Post.find({ id: person.id })
          .then(post => {
            res.render("postInfo", { data: post, user: person });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
