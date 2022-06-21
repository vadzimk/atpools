import nodemailer from 'nodemailer';
import {google} from 'googleapis'
import {auth, REDIRECT_URI, RECEIVING_EMAILS} from './config.js';
console.log("auth.user", auth.user)
const oauth2Client = new google.auth.OAuth2(auth.clientId, auth.clientSecret, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: auth.refreshToken})


async function send_mail(body) {

  let mailOptions = {
    from: `ATpools <${auth.user}>`,
    to: RECEIVING_EMAILS,
    subject: 'New quote request for ATpools',
    sender: body.email,
    replyTo: body.email,
    text: `${body.message} 
${body.name} 
${body.phone}`,
    html: `
        <div style="margin-bottom: 20px">
            <p style="font-size: 22px">${body.message}</p>
            <p style="font-size: 18px;">Best regards</div>
            <p style="font-size: 20px;">${body.name}</p>
        </div>
        <div style="margin-bottom: 20px">
            <a style="font-size: 20px" 
            href="tel://${body.phone}">${body.phone}</a>
        </div>
        <div style="margin-bottom: 20px">
            <a style="font-size: 20px"
            href="mailto:${body.email}">${body.email}</a>
        </div>
       `,
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