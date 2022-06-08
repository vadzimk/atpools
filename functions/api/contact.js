import 'dotenv/config'
import nodemailer from 'nodemailer';


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


export async function onRequest(request) {

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
  return new Response(`Hello world`);
}
