const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../src/models/User');

const initializePassport = passport => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done) => {
        const {
          id,
          displayName,
          emails: [emails],
          photos: [photos],
        } = profile;

        const newUser = {
          googleId: id,
          displayName,
          email: emails.value,
          image: photos.value,
        };

        try {
          let user = await User.findOne({ googleId: id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          done(error);
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (error) {
      return console.error(error);
    }
  });
};

module.exports = initializePassport;
