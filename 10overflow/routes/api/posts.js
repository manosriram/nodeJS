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
        id: user.id
      });
      // user._id = user.id;
      newPost
        .save()
        .then(post => {
          res.render("post", { user: user });
        })
        .catch(err => console.log(err));
    } else {
      res.status(403).json({ login: "Please login to post stuff" });
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
// @desc -- Route for Getting the Posts by an user.
// @access -- PUBLIC

router.get("/:name", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    const name = req.params.name;
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
                  userData: user,
                  name: name
                });
              } else {
                res.render("postInfo", {
                  data: post,
                  user: person,
                  isLoggedIn: 0,
                  name: name
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
// @route -- /api/posts/likePost/:id
// @desc -- Route for Liking a Post
// @access -- PRIVATE

router.post("/likePost/:id", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    var flag;
    if (user) {
      const id = req.params.id;
      Person.findById(user.id)
        .then(
          Post.findById(id)
            .then(post => {
              if (post) {
                // Check if the Post is already liked..
                for (t = 0; t < post.likes.length; t++) {
                  if (post.likes[t].id === user.id) {
                    post.likes.shift();
                    post.save();
                    flag = 1;
                    break;
                  } else {
                    flag = 0;
                    continue;
                  }
                }
                if (flag) {
                  flag = 0;
                  return res.status(200).json({ unliked: "Post Unliked!" });
                  // return res.render("postInfo", { liked: 0 });
                  // return res.status(200).json({ unliked: "Post Unliked!" });
                } else {
                  post.likes.unshift(user.id);
                  post
                    .save()
                    .then(res.status(200).json({ liked: "Post Liked!" }))
                    .catch(err => console.log(err));
                }
              } else {
                res.status(400).json({ noAccess: "Post not found" });
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

// @type -- POST
// @route -- /api/posts/follow/:id
// @desc -- Route for following a person
// @access -- PRIVATE

router.post("/follow/:id", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    var flag = 0;
    if (user) {
      const id = req.params.id;
      Person.findById(user.id)
        .then(person => {
          if (person) {
            for (t = 0; t < person.follows.length; t++) {
              if (person.follows[t].id === id) {
                person.follows.shift();
                person.save();
                flag = 1;
                break;
              } else {
                flag = 0;
                continue;
              }
            }

            if (flag) {
              flag = 0;
              return res
                .status(200)
                .json({ unfollowed: "Person Unfollowed.." });
            } else {
              person.follows.unshift(id);
              person
                .save()
                .then(res.status(200).json({ followed: "Person Followed." }))
                .catch(err => console.log(err));
            }
          } else {
            res.status(404).json({ notFound: "Person not found.." });
          }
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
