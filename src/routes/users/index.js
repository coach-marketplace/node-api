'use strict'

const userRouter = require('express').Router()

const { uploadUserAvatar } = require('../../middleware/file-upload')

const {
  readUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  addUserAvatar,
} = require('../../controllers/user/index.js')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

userRouter
  /**
   * @swagger
   * path:
   *  /users:
   *    get:
   *      summary: Get all users
   *      tags: [Users]
   *      responses:
   *        "200":
   *          description: Get an array of users from database
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  .get('/', readUsers)

  /**
   * @swagger
   * path:
   *  /users:
   *    post:
   *      summary: Create a user
   *      tags: [Users]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *                password:
   *                  type: string
   *      responses:
   *        "201":
   *          description: Get an object with the data of new user
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  .post('/', createUser)

  /**
   * @swagger
   * path:
   *  /users/:id:
   *    get:
   *      summary: Get one user
   *      tags: [Users]
   *      parameters:
   *        - in: path
   *          name: userId
   *          required: true
   *      responses:
   *        "200":
   *          description: Get an object with the user data
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  .get('/:id', readUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)
  .post('/:id/avatar', uploadUserAvatar, addUserAvatar)

module.exports = userRouter
