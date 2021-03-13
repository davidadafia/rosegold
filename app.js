const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');
const bookRoutes = require('./routes/bookRoutes');
//express app
const app = express();

const dbURI = 'mongodb+srv://adafia:april711@cluster0.8rmet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 3000))
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
    Blog.findById()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

//books route
app.get('/add-book', (req, res) => {
  const book = new Book({
      title: 'new book2',
      snippet: 'about my love for Rosie and Christ',
      body: 'Plenty plenty and some more'
  });

  book.save()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/all-books', (req, res) => {
  Book.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-book', (req, res) => {
  Book.findById()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.render('home', { title: 'home'});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Milady'});
});

app.get('/tutor', (req, res) => {
  res.render('tutor/games', { title: 'Learn'});
});



// blog routes
app.use('/blogs', blogRoutes);

app.use('/books', bookRoutes);
// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Babe' });
});