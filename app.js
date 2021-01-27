const express = require('express');

// creating an instance of express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

// send 404 page 
app.use((req, res) => {
    res.status(404).render('404');
});