'use strict'

const { LOCALE } = require('../../src/_utils/constants')

module.exports = {
  fakeId: '60278126aad280b372a39f57',
  exercise: {
    isArchived: false,
    isPrivate: true,
    isTemplate: true,
    content: [
      {
        lang: LOCALE.EN_US,
        name: 'Burpee',
        instructions: 'Lie on the floor, then get up and jump.',
        sport: 'CrossFit',
      },
      {
        lang: LOCALE.FR_FR,
        name: 'Burpee',
        instructions: 'Couche toi au sol, ensuite relève toi et saute.',
        sport: 'CrossFit',
      },
    ],
  },
}
