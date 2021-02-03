const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// creating an instance of express app
const app = express();

// Middleware and static files
app.use(express.static('public'));

// Post request encoder - for accepting form data
app.use(express.urlencoded({ extended: true }));

// rewuired for loading .env variables 
require('dotenv').config();

// register view engine
app.set('view engine', 'ejs');


// connect to mongoDB 
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0.csvgw.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => { app.listen(PORT), () => { console.log(`Server running on port ${PORT}`)} })
        .catch( (err) => { console.log(err.message)})

// Logging informtions with morgan
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title : 'About'});
})

/* blog routes */
app.use('/blogs', blogRoutes);

// send 404 page 
app.use((req, res) => {
    res.status(404).render('404', {title : '404'});
});