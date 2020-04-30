const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, content) => {
  console.log(process.env.EMAIL_ADDRESS)
  console.log(process.env.EMAIL_PASSWORD)

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  return await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: content,
  })
}

//TODO: change with right app URL
const sendVerificationEmail = async (user) => {
  let verificationURL =
    process.env.API_URL + 'auth/verifyEmail/' + user.emailToken
  return await sendEmail(
    user.email,
    'Welcome to Coach-Marketplace!',
    '<h1>Welcome to Coach-Marketplace!<h1></br>' +
      '<p>To activate your account, visit the following link: <p></br>' +
      "<a href='" +
      verificationURL +
      "'>Activate your account</a>",
  )
}

module.exports = {
  sendEmail,
  sendVerificationEmail,
}
