'use strict';

var path = require('path'),
    auth = require('../config/auth'),
    XMLHttpRequest = require('./xmlhttprequest').XMLHttpRequest,
    cors = require('cors');
module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:username', users.Oneuser);
  //app.get('/api/users/:username', users.Oneuser);
  app.get('/auth/users/bookmarks/:bookmarkId',users.all);
    app.get('/auth/sharedusers/bookmarks/:bookmarkId',users.sharedWithUsers);
   // app.get('/api/users',users.all);
  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);


    //Bookmark Routes
    var bookmarks = require('../controllers/bookmarks');
    app.get ('/api/bookmarks',bookmarks.all);
    app.post('/api/bookmarks', auth.ensureAuthenticated, bookmarks.create);
    app.post('/api/sharedbookmarks', auth.ensureAuthenticated, bookmarks.createShared);
    app.get('/api/bookmarks/:bookmarkId', auth.ensureAuthenticated,bookmarks.show);
    app.put('/api/bookmarks/:bookmarkId', auth.ensureAuthenticated, auth.bookmark.hasAuthorization, bookmarks.update);
    app.del('/api/bookmarks/:bookmarkId', auth.ensureAuthenticated, auth.bookmark.hasAuthorization, bookmarks.destroy);
    // setting up the param for bookmark
    app.param('bookmarkId', bookmarks.bookmark);
  // Angular Routes
    //Users Routes
//akamai requests

    app.get('/akamai/api', function(){
        console.log('working')
        //console.log(XMLHttpRequest);
        var xhr = new XMLHttpRequest();
        var accesstoken='akab-qdcb5y6tl5z7e65r-fee5f7iskjml2q4z';
        var clientsecret='/vUk1J+zgxnvuI6CgL/d6BDqrg5/DadViUvhzQc9pZ4=';
        var clienttoken='akab-2yuizqjkdbjf5w2g-62mcagvbznlc5ezq';
        var url = 'https://akaa-okrux5gdffmxdjwx-pdpxffuv7reessk2.luna.akamaiapis.net/diagnostic-tools/v1/locations'+
            '?access_token='+encodeURIComponent(accesstoken)+'&client_secret='+encodeURIComponent(clientsecret)+'&client_token='+
            encodeURIComponent(clienttoken);
        function handler(req,res){
            console.log(" new handler"+req+":::"+res);
        }
        if(xhr) {
            xhr.open('GET', url, true);
            xhr.onreadystatechange = handler;
            console.log("before send ");
            xhr.send();
            console.log("reached");
        }
    });

   app.get('/partials/*', function(req, res) {
   var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }

    res.render('index.html');
  });

}