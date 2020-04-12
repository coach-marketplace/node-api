'use strict'

const mongoose = require('mongoose')

const Lang = require('../../models/lang')

module.exports = {
  create(newLangData) {
    const { name, ISO_639_2, ISO_639_3 } = newLangData
    const newLang = new Lang({
      _id: new mongoose.Types.ObjectId(),
      name,
      ISO_639_2,
      ISO_639_3,
    })

    return newLang.save()
  },

  read(query = {}) {
    return Lang.find(query)
  },
}
