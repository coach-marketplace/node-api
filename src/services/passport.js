const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
process.env.NODE_ENV = 'test'
// eslint-disable-next-line no-undef
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
} = process.env.NODE_ENV

const CustomSessionStore = require('../_utils/jwt/custom-session-store')
const { log } = require('../controllers/auth/handlers')
const { getUserByEmail } = require('../controllers/user/handlers')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET || 'secret',
    },
    async (payload, done) => {
      try {
        return done(null, payload)
      } catch (error) {
        return done(error, false)
      }
    },
  ),
)

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await log(email, password)

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    },
  ),
)

passport.use(
  new GoogleStrategy(
    {
      clientID:
        GOOGLE_CLIENT_ID ||
        '410290218130-9rprt9p3u2pobvvqkea73nue5s8qfdpf.apps.googleusercontent.com',
      clientSecret: GOOGLE_CLIENT_SECRET || 'jdVwpq_tqJd8LzS52uGlb-g7',
      callbackURL: '/v1/auth/google/callback',
      state: false,
      passReqToCallback: true,
      /**
       * We define our own definition of store to be able to pass custom
       * properties
       */
      store: new CustomSessionStore({
        key: 'oauth2:google.com',
      }),
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { state } = JSON.parse(req.query.state)
        const { redirectUrl, isCoach } = JSON.parse(state)

        const user = await getUserByEmail(profile._json.email)

        return done(null, {
          redirectUrl,
          user,
          profile,
          isCoach: !!isCoach || false, // Be sure that is a boolean
        })
      } catch (error) {
        done(error.message)
      }
    },
  ),
)
