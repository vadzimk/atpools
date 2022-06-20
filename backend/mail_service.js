import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 1484314697598,
  }
});
// where to send the email and with what data:
let mailOptions = {
  from: "'Site contact form' <atpoolsla@gmail.com>",
  to: "vadzimkk@gmail.com, vadzimkk@gmail.com",
  subject: 'Nodemailer Project',
  text: 'Hi from your nodemailer project',
  html: "<b>Hi from your nodemailer project</b>", // html body
};


async function handler (event) {

  try {
    const subject = event.queryStringParameters.name || 'World'
    let success = false
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error from transporter: " + err)
        success = `Error ${err}`
      } else {
        console.log("Email sent successfully")
        success = "Success"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({message: info.messageId}),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return {statusCode: 500, body: error.toString()}
  }
}

export default handler;