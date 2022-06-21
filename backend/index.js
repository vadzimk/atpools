import express from 'express';

import send_mail from './mail_service.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;


app.use(express.static('../frontend')); // for local development
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));



app.post(`/api/contact`, async (req, res)=>{
  console.log(req.body)
  const info = await send_mail(req.body);
  res.status(info.statusCode).end();
})



app.listen(port, ()=>console.log(`Backend listening on port ${port}`))
