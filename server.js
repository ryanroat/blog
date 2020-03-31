const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('view engine', 'ejs');

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    // const articles = [
    //     {
    //         title: 'Test Article',
    //         createdDate: new Date(),
    //         description: 'test description'
    //     },
    //     {
    //         title: 'Test Article 2',
    //         createdDate: new Date(),
    //         description: 'test description 2'
    //     }
    // ];

    const articles = await Article.find().sort({
        createdDate: 'desc'
    });

    
    res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

app.listen(5000);
