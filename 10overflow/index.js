const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const app = express();
<<<<<<< HEAD

//bring all routes
const auth = require("./routes/api/auth");
// const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");
=======
>>>>>>> 17fbf8e3f8b7a709cb4abbca6e6efcffb8a9460f

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  session({ secret: "1234manomano", resave: false, saveUninitialized: true })
);

app.set("view engine", "ejs");

app.get("/confirmAuth", (req, res) => {
  if (req.session.id) return res.send("Logged In");
  else return res.send("Not Logged In");
});

//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route
app.get("/", (req, res) => {
  res.render("index");
});

<<<<<<< HEAD
app.get("/login", (req, res) => {
  res.render("login");
});

router.post("/loggedIn", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Person.findOne({ email })
    .then(person => {
      if (!person) {
        return res
          .status(404)
          .json({ emailerror: "User not found with this email" });
      }
      bcrypt
        .compare(password, person.password)
        .then(isCorrect => {
          if (isCorrect) {
            // res.json({ success: "User is able to login successfully" });
            //use payload and create token for user
            const payload = {
              id: person.id,
              name: person.name,
              email: person.email
            };
            req.session.person = person;
            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: 64000 },
              (err, token) => {
                // res.session.success("Logged In!!");

                res.render("../privateTemplates/loggedIn1");

                // console.log(token);

                // res.json({
                //   success: true,
                //   token: "Bearer " + token
                // });
              }
            );
          } else {
            res.status(400).json({ passworderror: "Password is not correct" });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

=======
>>>>>>> 17fbf8e3f8b7a709cb4abbca6e6efcffb8a9460f
//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

// app.use("/api/questions", questions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running at port ${port}`));
