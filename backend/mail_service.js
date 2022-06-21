import nodemailer from 'nodemailer';
import {google} from 'googleapis'
import {auth, REDIRECT_URI, RECEIVING_EMAILS} from './config.js';
console.log("auth.user", auth.user)
const oauth2Client = new google.auth.OAuth2(auth.clientId, auth.clientSecret, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: auth.refreshToken})


async function send_mail(body) {
  let mailOptions = {
    from: `${body.name} <${body.email}>`,
    to: RECEIVING_EMAILS,
    subject: 'New quote request in ATpools',
    text: `${body.message} 
${body.name} 
${body.phone}`,
    html: `<p>${body.message}</p>
        <h4>${body.name}</h4>
        <h4>${body.phone}</h4>`,
  };


  try {
  const accessToken = oauth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      ...auth,
      accessToken: accessToken
    }
  });


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

export default send_mail;