const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');

const app = express();

mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

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
