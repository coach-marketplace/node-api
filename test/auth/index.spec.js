/* eslint-disable no-undef */
'use strict'

const { assert } = require('chai')

// TODO: fix tests
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
  john: {
    email: 'john.doe@email.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
  },
  jane: {
    email: 'jane.doe@email.com',
    password: 'password',
    firstName: 'Jane',
    lastName: 'Doe',
  },
}

describe('Authentication', () => {
  let state = {
    registerUser: null,
    token: null,
  }

  before(done => {
    connectToDatabase(async () => {
      // state.user = await createUser(MOCK_USER.john)
      done()
    })
  })

  after(async done => {
    await deleteUserById(state.registerUser._id)
    disconnectToDatabase(done)
  })

  it('Should register', async () => {
    try {
      const response = await HTTP.post('auth/register-local', MOCK_USER.jane)

      state.registerUser = response.body

      assert(response.status, 200)
      assert(!!response.body, true)
      assert(response.body.email, MOCK_USER.jane.email)
    } catch (error) {
      console.log('error', error.message)
    }
  })

  // it('Should login', async () => {
  //   try {
  //     const response = await HTTP.post('auth/login-local', {
  //       email: MOCK_USER.jane.email,
  //       password: MOCK_USER.jane.password,
  //     })

  //     state.token = response.body.token
  //     // HTTP.setToken(response.body.token)

  //     assert(response.status, 201)
  //     assert(!!response.body.token, true)
  //     assert(!!response.body.user._id, true)
  //   } catch (error) {
  //     console.log('chienne', error.message)
  //     assert(true, false)
  //   }
  // })

  // it('Should get auth user with token', async () => {
  //   try {
  //     const response = await HTTP.get('auth/me')

  //     console.log('yo', response.body)

  //     assert(response.body.email, MOCK_USER.jane.email)
  //     // assert(response.status, 201)
  //     // assert(!!response.body.token, true)
  //     // assert(!!response.body.user._id, true)
  //   } catch (error) {
  //     console.log('error chien', error)
  //     assert(true, false)
  //   }
  // })
})
