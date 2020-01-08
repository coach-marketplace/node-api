const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.serializeUser((data, done) => {
  done(null, data)
})

passport.deserializeUser((data, done) => {
  done(null, data)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5555/v1/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, { accessToken, refreshToken, profile })
    },
  ),
)
