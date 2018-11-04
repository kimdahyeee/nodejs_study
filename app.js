var express = require('express');
var app = express();

app.use(express.static('public'));

//template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('hello express');
});

app.get('/template', function(req, res) {
    var data = [{name: 'cat1'}, {name: 'cat2'}];
    res.render('cat', {cats: data});
});

app.get('/topic/:id', function(req, res) {
    var topics = [
        '11',
        '22',
        '333'
    ];

    var output = `${topics[req.params.id]}`;
    res.send(output);
});

app.get('/dynamic', function(req, res) {
    var lis = '';
    for(var i=0; i<5; i++) {
        lis = lis + '<li>coding</li>';
    }

    var time = Date();

    var result = 
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
          Hello, Dynamic!
          <ul>
            ${lis}
          </ul>
          ${time}
      </body>
    </html>`;

    res.send(result);
});

app.get('/route', function(req, res) {
    res.send('hello router, <img src ="/route.jpg"/>')
});

app.get('/login', function(req, res) {
    res.send('login please');
});

app.listen(3000, function() {
    console.log('connected');
});