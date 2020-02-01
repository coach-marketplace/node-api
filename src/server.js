/* eslint-disable no-undef */
'use strict'

const http = require('http')
const app = require('./app')
const database = require('./database')
const { PORT } = process.env

const server = http.createServer(app)
const io = require('socket.io').listen(server)

database.connect().then(() => {
  server.listen(PORT, () => {
    console.log(`Server in running on http://localhost:${PORT}/`)

    io.on('connection', socket => {
      console.log('A user is succesfully to the socket...')

      var news = [
        {
          title: 'The cure of the Sadness is to play Videogames',
          date: '04.10.2016',
        },
        {
          title: 'Batman saves Racoon City, the Joker is infected once again',
          date: '05.10.2016',
        },
        {
          title: "Deadpool doesn't want to do a third part of the franchise",
          date: '05.10.2016',
        },
        {
          title:
            'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',
          date: '04.10.2016',
        },
      ]

      // Send news on the socket
      socket.emit('news', news)

      socket.on('my other event', function(data) {
        console.log(data)
      })

      socket.on('new-user', user => {
        console.log('new user (client) connected', user)
      })
    })
  })
})
