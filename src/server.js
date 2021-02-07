/* eslint-disable no-undef */
'use strict'

const app = require('./app')
const { init: initSockets } = require('./socket')
const {
  connectUser,
  disconnectUserBySocketId,
} = require('./controllers/user/handlers')

const { PORT } = process.env

const server = app.listen(PORT)
const io = initSockets(server)

io.on('connection', async (socket) => {
  console.log('new client connection')
  try {
    const { userId } = socket.handshake.query
    if (userId) {
      await connectUser(userId, socket.id)
    }
  } catch (error) {
    console.log('error', error.message)
  }

  // socket.join
  // socket.broadcast.to
  socket.on('disconnect', async () => {
    try {
      await disconnectUserBySocketId(socket.id)
    } catch (error) {
      console.log('error', error.message)
    }
  })
})

console.log(`--- Server in running on http://localhost:${PORT}/ ---`)
