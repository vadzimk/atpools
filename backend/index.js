import express from 'express';

import send_mail from './mail_service.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;
console.log("auth.user", process.env.MAIL_USERNAME)

app.use(express.static('../frontend')); // for local development
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/contact', async (req, res)=>{
  console.log(req.body)
  await send_mail(req.body);
  res.status(200).redirect('/');
})



app.listen(port, ()=>console.log(`Backend listening on port ${port}`))
