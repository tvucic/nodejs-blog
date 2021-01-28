const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// creating an instance of express app
const app = express();
require('dotenv').config();

// register view engine
app.set('view engine', 'ejs');


// connect to mongoDB 
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0.csvgw.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( (result) => { app.listen(3000) })
        .catch( (err) => { console.log(err)})

// Logging informtions with morgan
app.use(morgan('dev'));

// Middleware and static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title : 'Home', blogs});
})

app.get('/about', (req, res) => {
    res.render('about', { title : 'About'});
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title : 'Create'});
})

// send 404 page 
app.use((req, res) => {
    res.status(404).render('404', {title : '404'});
});