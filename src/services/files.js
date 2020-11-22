const fs = require('fs')

const { DIRECTORY } = require('../_utils/constants')

module.exports.getUserAvatar = (userId) => {
  if (!userId) return null

  /**
   * The avatar directory is located at /static/avatar/
   * So we need to go 2 parent levels before access is base in __dirname
   */
  const avatarDirectory = `${__dirname}/../../static/${DIRECTORY.AVATAR}/`

  let files
  try {
    const allFiles = fs.readdirSync(avatarDirectory)
    /* remove README.md */
    files = allFiles.filter((f) => f !== 'README.md')
  } catch (error) {
    console.log(error.message)
    files = []
  }

  if (!files.length) return null

  /**
   * each file is a string like: 5e7f2cd2b46b9ba41d575cde.(jpg|png|...)
   * We should compare only the part before the `.`
   */
  const userAvatar = files.find((file) => file.split('.')[0] === String(userId))

  if (!userAvatar) return null

  const userAvatarUrl = `${process.env.API_URL}/${DIRECTORY.PUBLIC}/${DIRECTORY.AVATAR}/${userAvatar}`

  return userAvatarUrl
}
