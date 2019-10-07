'use strict'

exports.send404 = (req, res, next) => {
  res.status(404).json({ message: 'Not found' })
}
