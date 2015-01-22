var express = require('express');
var app = express();
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var staticPath = path.join(__dirname,'static');
var libPath = path.join(__dirname, '../lib');
var viewsPath = path.join(__dirname,'views');

app.set('view engine', 'jade');
app.set('views', viewsPath);

function withNib(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.use(stylus.middleware({ src: staticPath, compile: withNib }));
app.use(express.static(staticPath));
app.use('/lib', express.static(libPath));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/test', function(req, res) {
  res.render('test');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
