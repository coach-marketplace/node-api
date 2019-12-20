/* eslint-disable no-undef */
'use strict'

const { assert } = require('chai')

const {
  connectToDatabase,
  disconnectToDatabase,
} = require('../_utils/helpers/database')
const { getUsers, createUser, updateUser, deleteUser } = require('./queries')

describe('User', () => {
  let data = {
    user: null,
  }

  before(done => {
    connectToDatabase(done)
  })

  after(done => {
    disconnectToDatabase(done)
  })

  it('Should get empty list', async () => {
    const res = await getUsers()
    assert(res.body.length === 0, 'List is empty')
  })
  it('Should add a user with only email', async () => {
    const res = await createUser({ email: 'john.doe@email.com' })
    assert(res.body._id, 'Get new user')
    assert(!res.body.first_name, 'User should have no firstname')
    assert(!res.body.last_name, 'User should have no lastname')
    data.user = res.body
  })
  it('Should avoid create user within existing email', async () => {
    const res = await createUser({ email: 'john.doe@email.com' })
    assert(res.body.public_message, 'Get error message')
  })
  it('Should update an existing user', async () => {
    const {
      user: { _id: id },
    } = data
    const res = await updateUser(id, {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    })
    assert(res.body.first_name === 'John', 'Get new user')
    assert(res.body.last_name === 'Doe', 'Get new user')
  })
  it('Should delete an existing user', async () => {
    const {
      user: { _id: id },
    } = data
    const res = await deleteUser(id)
    assert(res.body.message, 'Get message')
  })
})
