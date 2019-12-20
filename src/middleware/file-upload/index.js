'use strict'

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './static/user-avatars/')
  },
  filename: (req, file, callback) => {
    const { id } = req.params
    const [, type] = file.mimetype.split('/')
    const newFileName = `${id}.${type}`
    req.userAvatar = newFileName
    callback(null, newFileName)
  },
})

const limits = { fileSize: 1024 * 1024 * 5 } // 5MB

const fileFilter = (req, file, callback) => {
  const acceptedMimeTypes = ['image/jpeg', 'image/png']
  if (acceptedMimeTypes.includes(file.mimetype)) {
    callback(null, true)
    return
  }
  callback(new Error('File type not allowed'), false)
}

const upload = multer({
  storage,
  limits,
  fileFilter,
})

module.exports = {
  uploadUserAvatar: upload.single('avatar'),
}
