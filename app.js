
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( (result) => { app.listen(3000) })
        .catch( (err) => { console.log(err)})

// Logging informtions with morgan
app.use(morgan('dev'));


// mongoose sandbox handlerer
app.get('/add-blog', (req,res) => {

    const blog = new Blog({
        title: 'First Blog',
        snippet: 'Read my second blog',
        body: 'Hello readers, isn\'t my blog awesomw and again'
    });
    blog.save()
        .then( (result) => {
            res.send(result)
        })
        .catch( (err) => {
            console.log(err);
        })
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/single-blog', (req, res) => {
    Blog.findById('600d4c2f0df79715997ddf89')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title : 'About'});

})

/*

    // Blog routes

*/

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Post blog from the form 

  app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Get single blog based on _id 

  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });

// Delete blog from frontend 
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/blogs/create', (req, res) => {
    res.render('create', { title : 'Create'});
})

// send 404 page 
app.use((req, res) => {
    res.status(404).render('404', {title : '404'});
});