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
        author: user.name,
        title: req.body.title,
        textArea: req.body.textArea,
        id: user.id
      });
      newPost
        .save()
        .then(post => {
          res.render("post", { user: user, post: newPost });
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
      res.render("post", { user: user, post: post });
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
// @desc -- Route for Getting the Posts by an user based on his name..
// @access -- PUBLIC

router.get("/:name", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    const name = req.params.name;
    Person.findOne({ name: req.params.name })
      .then(person => {
        if (!person) {
          res.status(404).json({ notFound: "User not found with this name.." });
        } else {
          var following = 0;
          for (t = 0; t < person.follows.length; t++) {
            if (person.follows[t].id === user.id) {
              following = 1;
              break;
            } else {
              following = 0;
              continue;
            }
          }
          Post.find({ id: person.id })
            .then(post => {
              if (user) {
                res.render("postInfo", {
                  data: post,
                  user: person,
                  isLoggedIn: 1,
                  userData: user,
                  name: name,
                  following: following
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
        .then(person =>
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
                  return res.status(200).redirect("back");
                } else {
                  post.likes.unshift(user.id);

                  post.save().then(res.status(200).redirect("back"));

                  // .then(res.status(200).json({ liked: "Post Liked!" }))
                  // .catch(err => console.log(err));
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

// @type -- POST
// @desc -- Route for Searching a person's profile..
// @access -- PUBLIC

router.post("/getUser", (req, res) => {
  const name = req.body.name;
  res.redirect("/api/posts/" + name);
});

// @type -- GET
// @route -- /api/posts/:id
// @desc -- Route for Getting Profile Information of the User based on ID
// @access -- Public

<<<<<<< HEAD
router.get("/user/:id", (req, res) => {
=======
router.get("/id/:id", (req, res) => {
>>>>>>> 2587496de50c819a98c7148add8cdf56b03be8b0
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      const id = req.params.id;
      Person.findById(id)
        .then(person => {
          Post.findById(person.id)
            .then(res.render("post", { user: user }))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      res.json({ notFound: "No User found with this ID" });
    }
  });
});

// @type -- POST
// @route -- /api/posts/followers
// @desc -- Route for Getting all the followers of the user..
// @access -- PUBLIC

router.post("/following", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      var data = [];
      var obj = {};
      Person.findById(user.id)
        .then(person => {
          for (var t = 0; t < person.follows.length; t++) {
            Person.findById(person.follows[t]._id)
              .then(person2 => {
                data.push(person2.name);
              })
              .catch(err => console.log(err));
            // console.log(person);
          }
          obj.data = data;
          res.render("follow", { data: obj.data });
        })
        .catch(err => console.log(err));
    } else {
      res
        .status(403)
        .json({ noAccess: "Please Login to see your information.." });
    }
  });
});

module.exports = router;
