require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc").Strategy;
const { v4: uuidv4 } = require("uuid");

const User = require("../models/login_singUp.model");
// console.log(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)
passport.use(
  new GoogleStrategy(
    {
      clientID: "487455266921-eidjjni1692sqcndr6r89pufc08spu6u.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://shopclues-backend.herokuapp.com/oauth2/redirect/google",
      // passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?.email }).lean().exec();
      console.log(user)

      if (!user) {
        user = await User.create({
          email: profile?.email,
          password:  uuidv4(),
        });
        console.log(user)
      }
      console.log(profile?.email);
      return done(null, user);
    }
  )
);

module.exports = passport;