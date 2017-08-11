var http = require('http'),
	request = require('request'),
	express = require('express'),
	path = require('path'),
	querystring = require("querystring");

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', function(req, res) {
    res.send(204);
});

app.get('/', function(req, res) {
  res.render('main');
});

app.get('/admin', function(req, res) {
  res.send('hi');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});