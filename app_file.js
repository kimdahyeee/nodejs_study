var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views_file');
app.set('view engine', 'ejs');

app.get('/topic/new', function(req, res) {
    res.render('new');
});

app.get(['/topic', '/topic/:id'], function(req, res) {
    
    fs.readdir(__dirname + '/data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('internal server error!!');
        }

        var id = req.params.id;

        if(id) {
            fs.readFile(__dirname + '/data/' + id, 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                    res.status(500).send('internal server error!!');
                }
                res.render('view', {topics: files, title: id, description: data});
            });
        } else {
            res.render('view', {topics:files, title:'hello', description:'hello javascript'});
        }
        
    });
});

app.post('/topic', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile(__dirname + '/data/' + title, description, (err) => {
        if(err) {
            res.status(500).send('internal server error!!');
        }
        res.send('success!!');
    });
});

app.listen(3000, function() {
    console.log('location ok');
});