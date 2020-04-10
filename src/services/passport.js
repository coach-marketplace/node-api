const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// eslint-disable-next-line no-undef
const { /*GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,*/ JWT_SECRET } = process.env

const { getUserById } = require('../controllers/user/handlers')
const { log } = require('../controllers/auth/handlers')

passport.serializeUser((user, done) => {
  console.log('serializeUser', user)
  done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    console.log('deserializeUser', userId)
    const user = await getUserById(userId)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
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
        console.log('+++')
        return done(error)
      }
    },
  ),
)

// TODO: build google auth
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:5555/v1/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         if (!profile._json && !profile._json.email) {
//           throw new Error('No email in google profile')
//         }
//         const results = await getUserByEmail(profile._json.email)
//         if (results.length) {
//           const user = results[0]
//           if (user.google && user.google.id) {
//             done(null, user)
//           } else {
//             const newUserData = {
//               google: { id: profile.id },
//             }
//             if (profile._json.picture) {
//               newUserData.google = {
//                 ...newUserData.google,
//                 picture: profile._json.picture,
//               }
//             }
//             const updatedUser = await editUser(user._id, newUserData)
//             done(null, updatedUser)
//           }
//         } else {
//           const newUserData = {
//             email: profile._json && profile._json.email,
//             firstName: profile.name && profile.name.givenName,
//             lastName: profile.name && profile.name.familyName,
//             google_id: profile.id,
//           }
//           profile._json.picture &&
//             (newUserData.google_avatar = profile._json.picture)
//           const newUser = await addUser(newUserData)
//           done(null, newUser)
//         }
//       } catch (error) {
//         // TODO: handle errors... because here the api send back an plain text error
//         done(error, null)
//       }
//     },
//   ),
// )
