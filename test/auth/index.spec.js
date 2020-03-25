/* eslint-disable no-undef */
'use strict'

const { assert } = require('chai')

const HTTP = require('../_utils/helpers/Http')
const {
  connectToDatabase,
  disconnectToDatabase,
} = require('../_utils/helpers/database')
const {
  createUser,
  deleteUserById,
} = require('../../src/controllers/user/handlers')

const MOCK_USER = {
  email: 'john.doe@email.com',
  password: 'password',
  firstName: 'John',
  lastName: 'Doe',
}

describe('Authentication', () => {
  let state = {
    user: null,
    registerUserId: null,
  }

  before(done => {
    connectToDatabase(async () => {
      state.user = await createUser(MOCK_USER)
      done()
    })
  })

  after(async done => {
    await deleteUserById(state.user._id)
    await deleteUserById(state.registerUserId)
    disconnectToDatabase(done)
  })

  it('Should login', async () => {
    const response = await HTTP.post('auth/login-local', {
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    })

    assert(response.status, 201)
    assert(!!response.body.token, true)
    assert(!!response.body.user.id, true)
  })

  it('Should register', async () => {
    const response = await HTTP.post('auth/register-local', {
      email: 'test@email.com',
      password: 'password',
    })

    state.registerUserId = response.body._id

    assert(response.status, 200)
    assert(!!response.body, true)
  })
})
