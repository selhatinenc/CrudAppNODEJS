const express=require('express');
const homeRoute=require('./routes/home');
const path = require('path');
const app=express();
const mongoose=require('mongoose');
const port=3000;
const bodyParser=require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/PlayerApp', {useNewUrlParser: true});
const db=mongoose.connection;
db.on('error',(error) => console.error("error"));
db.once('open',() => console.log('Connected to Database'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/home',homeRoute);


app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})

