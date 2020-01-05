'use strict'

const sportsRouter = require('express').Router()

const {
  getSports,
  addSport,
  getSportByName,
  getSportById,
  updateSport,
  deleteSport,
} = require('../../controllers/sport/index.js')

/**
 * @swagger
 * tags:
 *   name: Sports
 *   description: Sports management
 */

sportsRouter
  /**
   * @swagger
   * path:
   *  /sports:
   *    get:
   *      summary: Get all sports
   *      tags: [Sports]
   *      responses:
   *        "200":
   *          description: Get an array of sports from database
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sport'
   */
  .get('/', getSports)

  /**
   * @swagger
   * path:
   *  /sports:
   *    post:
   *      summary: Create a sport
   *      tags: [Sports]
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
   *          description: Get an object with the data of new sports
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  .post('/', addSport)

  /**
   * @swagger
   * path:
   *  /sport/:id:
   *    get:
   *      summary: Get one sport by id
   *      tags: [Sports]
   *      parameters:
   *        - in: path
   *          id: sportId
   *          required: true
   *      responses:
   *        "200":
   *          description: Get an object with the sport data
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sport'
   */
  .get('/:id', getSportById)
  /**
   * @swagger
   * path:
   *  /sport/:name/byname:
   *    get:
   *      summary: Get one sport by name
   *      tags: [Sports]
   *      parameters:
   *        - in: path
   *          name: name
   *          required: true
   *      responses:
   *        "200":
   *          description: Get an object with the sport data
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sport'
   */
  .get('/:name/byname', getSportByName)
  .put('/:id', updateSport)
  .delete('/:id', deleteSport)

module.exports = sportsRouter
