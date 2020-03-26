const express = require('express');
const articleRouter = require('./routes/articles');

const app = express();

app.set('view engine', 'ejs');
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const articles = [
        {
            title: 'Test Article',
            createdDate: new Date(),
            description: 'test description'
        },
        {
            title: 'Test Article 2',
            createdDate: new Date(),
            description: 'test description 2'
        }
    ];

    res.render('index', { articles });
});

app.listen(5000);
