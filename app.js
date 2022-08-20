// express stuff
const express = require("express");
const bodyParser = require("body-parser");

// jwt stuff
const jwt = require("jsonwebtoken");

// passport stuff
const passport = require("passport");
const jwtStrategy = require("./strategies/jwt");
passport.use(jwtStrategy);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello express server");
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  // This lookup would normally be done using a database
  if (email === "paul@nanosoft.co.za") {
    if (password === "pass") {
      // the password compare would normall be done using bcrypt
      const opts = { expiresIn: 120 }; // token expires in two mintues
      const secret = "SECRET_KEY"; // normally, should be stored in .env file and call it with process.env.secret
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
  }

  return res.status(401).json({ message: "Auth Failed" });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({
      massage: "YaY! this a protected Route",
      user: req.user
    });
  }
);

app.listen(3000);
