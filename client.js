var express = require('express');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bunyan = require('bunyan');
var bodyParser = require('body-parser');

var app = express();
var log = bunyan.createLogger({
    name: 'Microsoft OIDC Example Web Application - Client'
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('http://localhost:5000/');
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json({ extended : true }));
app.use(express.static(__dirname + '/public'));

let loggedUser = null;
app.get('/', function(req, res) {
  log.info('Entered the home')
  res.render('index', { user: loggedUser });
});

app.post('/', function(req, res) {
  log.info('Entered the home - POST')
  loggedUser = req.body.user;
  res.send(200);
});

app.listen(5000);
