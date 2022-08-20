const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET_KEY"; // normally store this in process.env.secret

module.exports = new jwtStrategy(opts, (jwt_payload, done) => {
  if (jwt_payload.email === "paul@nanosoft.co.za") {
    return done(null, true);  // passport add a property user property to req (req.user = true)
  }                           // you can change true to be jwt_payload.email to send email to req

  return done(null, false);
});
