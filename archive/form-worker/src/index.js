/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
dotenv.config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});


export default {
  async fetch(request) {

    // where to send the email and with what data:
    let mailOptions = {
      from: "'Site contact form' <atpoolsla@gmail.com>",
      to: "vadzimkk@gmail.com, vadzimkk@gmail.com",
      subject: 'Nodemailer Project',
      text: 'Hi from your nodemailer project',
      html: "<b>Hi from your nodemailer project</b>", // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions,(err, data)=>{
      if (err){
        console.log("Error " + err)
      } else {
        console.log("Email sent successfully")
      }
    });





    // ...
    return new Response(`Sent`);
  },
};
