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
        name: user.name,
        title: req.body.title,
        textArea: req.body.textArea,
        id: user.id,
        likes: []
      });
      // user._id = user.id;
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
      res.status(403).json({ noAccess: "Please Login To Post.." });
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
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    Person.findOne({ name: req.params.name })
      .then(person => {
        if (!person) {
          res.status(404).json({ notFound: "User not found with this name.." });
        } else {
          Post.find({ id: person.id })
            .then(post => {
              if (user) {
                res.render("postInfo", {
                  data: post,
                  user: person,
                  isLoggedIn: 1,
                  userData: user
                });
              } else {
                res.render("postInfo", {
                  data: post,
                  user: person,
                  isLoggedIn: 0
                });
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });
});

// @type -- POST
// @route -- /api/posts/
// @desc -- Route for Liking a Post
// @access -- PRIVATE

router.post("/likePost/:id", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      const id = req.params.id;
      Person.findById(user.id)
        .then(
          Post.findById(id)
            .then(post => {
              if (post) {
                post.likes.unshift({ id: user.id });
                post
                  .save()
                  .then(res.status(200).json({ saved: "Post Liked!" }))
                  .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
    } else {
      res.status(403).json({ failed: "Please Login to Like Posts.." });
    }
  });
});

module.exports = router;
