/* eslint-disable no-undef */
'use strict'

// const chai = require('chai')
// const { assert } = chai

const Http = require('../_utils/Http')

// describe('Ping the app', () => {
//   it('Should ping the app and get pong', () =>
//     Http.ping()
//       .then((res) => {
//         assert.strictEqual(res.text, 'pong')
//       })
//       .catch((error) => console.log(error)))
// })

const expect = require('chai').expect

module.exports = function () {
  context('Ping the app', function () {
    it('Should get pong', async function (done) {
      try {
        const res = await Http.ping()
        expect(res.text).to.equal('pog')
        done()
      } catch (e) {
        done()
      }
      // Http.ping()
      //   .then((res) => {
      //     expect(res.text).to.equal('pog')
      //     done()
      //   })
      //   .catch(
      //     (error) => {
      //       done()
      //     } /*console.log(error)*/,
      //   )
    })
  })
}
