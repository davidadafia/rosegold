const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

const dbURI = 'mongodb+srv://adafia:april711@cluster0.8rmet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT))
  .catch(err => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// listen for requests


// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// Mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog2',
        snippet: 'about my love for Rosie and Christ',
        body: 'Plenty plenty and some more'
    });

    blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
})

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
    Blog.findById('60358a1f62669d36ccdbe378')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    //res.send('<h1> home rosie</h1>');
    res.render('about', { title: 'Milady'});
});


app.get('head', (req, res) => {
    res.render('head', { title: 'Babe'});
})

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    
    res.status(404).render('404', { title: 'Babe' });
});