import nodemailer from 'nodemailer';
import {google} from 'googleapis'
import {auth, REDIRECT_URI, RECEIVING_EMAILS} from './config.js';

console.log("auth.user", auth.user)
const oauth2Client = new google.auth.OAuth2(auth.clientId, auth.clientSecret, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: auth.refreshToken})

async function send_mail(body) {
  const bfs = 20; // base font size
  let mailOptions = {
    from: `ATpools <${auth.user}>`,
    to: RECEIVING_EMAILS,
    subject: `New quote request from ${body.name}`,
    sender: body.email,
    replyTo: body.email,
    text: `${body.message} 
${body.name} 
${body.phone}`,
    html: `
        <div style="margin-bottom: ${bfs}px">
            <p style="font-size: ${1.1*bfs}px">${body.message}</p>
            <hr style="border: 0;
    border-bottom: 1px dotted #ccc;
    background: #999;"/>
            <p style="font-size: ${bfs}px;">${body.name}</p>
        </div>
        <div style="margin-bottom: ${bfs}px">
            <a style="font-size: ${bfs}px" 
            href="tel://${body.phone}">${body.phone}</a>
        </div>
        <div style="margin-bottom: ${bfs}px">
            <a style="font-size: ${bfs}px"
            href="mailto:${body.email}">${body.email}</a>
        </div>
       `,
  };
  let success = true;
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
    await transporter.sendMail(mailOptions, (err, _) => {
      if (err) {
        console.log("Error from transporter: " + err)
        success = false;
      } else {
        console.log("Email sent successfully")
      }
    });
  } catch (error) {
    console.log("error:", error.toString());
    return {statusCode: 500, body: error.toString()}
  }
  return {
    statusCode: success ? 200 : 500,
    body: "ok"
  }
}

export default send_mail;