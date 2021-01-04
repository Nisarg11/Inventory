const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/product-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const morgan = require('morgan');
const path = require('path');

require("dotenv").config();


const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json());

app.use(express.static(path.join('public')));




app.use((req, res, next) => {
 
 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);


app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname,'public', 'index.html'));
});

// app.use(( req, res, next) =>{
//     const error = new HttpError('Could not find this route',404);
//     throw error;
// });




app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred'});
});

let user = process.env.user;
let password = process.env.password;
let dbname = process.env.dbname;
mongoose
  .connect(
    `mongodb+srv://${user}:${password}@cluster0.2kz4w.mongodb.net/${dbname}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
