'use strict'

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './static/avatar/')
  },
  filename: (req, file, callback) => {
    const { id } = req.params
    let [, type] = file.mimetype.split('/')
    if (type === 'jpeg') {
      type = 'jpg'
    }
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

const uploadAvatar = upload.single('avatar')

module.exports = {
  uploadUserAvatar: (req, res, next) => {
    uploadAvatar(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).json({
          message: err.message,
        })
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).json({
          message: err.message,
        })
      }

      next()
    })
  },
}
