'use strict';

// Module dependencies.
var express = require('express'),
    http = require('http'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(express),

    config = require('./lib/config/config');

var app = express();

// Connect to database
//var db = require('./lib/db/mongo').db;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var pass = require('./lib/config/pass');
app.use(allowCrossDomain);
// App Configuration
app.configure('development', function(){
    app.use(allowCrossDomain);
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app/views');
});

/*app.all('/akamai/api', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});*/
app.configure('production', function(){
    app.use(allowCrossDomain);
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));

// cookieParser should be above session
app.use(express.cookieParser());

// bodyParser should be above methodOverride
app.use(express.bodyParser());
app.use(express.methodOverride());

// express/mongo session storage
app.use(express.session({
  secret: 'MEAN',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

//routes should be at the last
app.use(app.router);

//Bootstrap routes
require('./lib/config/routes')(app);

// Start server
var port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

/*var accesstoken='akab-qdcb5y6tl5z7e65r-fee5f7iskjml2q4z';
var clientsecret='/vUk1J+zgxnvuI6CgL/d6BDqrg5/DadViUvhzQc9pZ4=';
var clienttoken='akab-2yuizqjkdbjf5w2g-62mcagvbznlc5ezq';
var url = 'https://akaa-okrux5gdffmxdjwx-pdpxffuv7reessk2.luna.akamaiapis.net/diagnostic-tools/v1/locations'+
    '?access_token='+encodeURIComponent(accesstoken)+'&client_secret='+encodeURIComponent(clientsecret)+'&client_token='+
    encodeURIComponent(clienttoken);
var aclient = http.createClient(80, url);
*/