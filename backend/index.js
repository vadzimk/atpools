import express from 'express';

import send_mail from './mail_service.js';
import bodyParser from 'body-parser';
// import {BASE_URL} from './config.js';
// console.log("BASE_URL=", BASE_URL)
const app = express();
const port = 3001;


app.use(express.static('../frontend')); // for local development
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// app.get(`${BASE_URL}`, (req, res)=>{
//   res.status(200)
// })

app.post(`/api/contact`, async (req, res)=>{
  console.log(req.body)
  await send_mail(req.body);
  res.status(200).redirect('/');
})



app.listen(port, ()=>console.log(`Backend listening on port ${port}`))
