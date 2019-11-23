/* eslint-disable no-undef */
'use strict'

const chai = require('chai')
const { assert } = chai

const {
  connectToDatabase,
  disconnectToDatabase,
} = require('../_utils/helpers/database')
const { getUsers } = require('./queries')

describe('User', () => {
  before(done => {
    connectToDatabase(done)
  })

  after(done => {
    disconnectToDatabase(done)
  })

  it('Get empty users list', async () => {
    const response = await getUsers()
    assert(response.body.length === 0, 'List is empty')
  })
})
