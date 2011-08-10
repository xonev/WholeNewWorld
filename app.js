
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var connect = require('./database');
var database = connect('127.0.0.1', 27017);
    
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade')
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Race Index'
  });
});

app.get('/race/:name', function(req, res) {
    res.send(JSON.stringify(database.getRace(req.params.name)));
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
