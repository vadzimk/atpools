import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import handler from './mail_service.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(express.static('../frontend')); // for local development
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/contact', async (req, res)=>{
  console.log(req.body)
  await handler(req.body);
  res.status(200).redirect('/');
})



app.listen(port, ()=>console.log(`Backend listening on port ${port}`))
