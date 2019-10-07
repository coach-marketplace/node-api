const mongoose = require('mongoose')

module.exports = {
  connect: () => mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Database connected!')
    })
    .catch(error => {
      console.log('Database connexion error:', error.message)
    }),
  close: () => mongoose.disconnect()
}
