'use strict'

exports.send404 = (req, res) => {
  res.status(404).json({ message: 'Not found' })
}
