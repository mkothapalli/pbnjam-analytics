'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  Bookmark = mongoose.model('Bookmark'),
  ObjectId = mongoose.Types.ObjectId;

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.save(function(err) {
    if (err) {
      return res.json(400, err);
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err);
      return res.json(newUser.user_info);
    });
  });
};

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function (req, res, next) {
  var username = req.params.username;

  User.findById(ObjectId(username), function (err, user) {
    if (err) {
      return next(new Error('Failed to load User'));
    }
    if (user) {
      res.send({username: user.username, profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND')
    }
  });
};

/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = function (req, res, next) {
  var username = req.params.username;
  User.findOne({ username : username }, function (err, user) {
    if (err) {
      return next(new Error('Failed to load User ' + username));
    }

    if(user) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  });
};
exports.user = function(req, res, next, id) {
    User.load(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};
exports.all = function(req, res , next) {
    var bookmarkId =req.params.bookmarkId;
    Bookmark.find({actualbookmark:ObjectId(bookmarkId)},function(err,restOfUsers){
        // my guess only one record
        console.log("users data::"+restOfUsers);
        var arrayOfUsersIgnored=[];
        arrayOfUsersIgnored.push(req._passport.session.user.toString());
        for(var i=0;i<restOfUsers.length;i++){
            arrayOfUsersIgnored.push(restOfUsers[i].owner.toString());
        }
        User.find({_id :{$nin:arrayOfUsersIgnored}}).sort('-username').select('username').exec(function(err, users) {
            if (err) {
                return next(new Error('Failed to load Users '));
            } else {
                res.send(users);

            }
        });
    });
};
exports.sharedWithUsers=function(req,res,next){
    var bookmarkId =req.params.bookmarkId;
    var userId = req._passport.session.user.toString();
    Bookmark.find({actualbookmark:ObjectId(bookmarkId),creator:ObjectId(userId)},function(err,sharedWithUsers){
        console.log("shared users data::"+sharedWithUsers);
        var arrayOfUsers=[];
        //arrayOfUsersIgnored.push(req._passport.session.user.toString());
        for(var i=0;i<sharedWithUsers.length;i++){
            arrayOfUsers.push(sharedWithUsers[i].owner.toString());
        }
        User.find({_id :{$in:arrayOfUsers}}).sort('-username').select('username').exec(function(err, users) {
            if (err) {
                return next(new Error('Failed to get  Users with whom bookmark was shared'));
            } else {
                res.send(users);

            }
        });
    });
};
exports.Oneuser = function(req, res , next) {
    var username = req.params.username;
    User.findOne({ username : username }, function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }

        if(user) {
            res.json(user);
        }
    });
    // res.send({username : "hello"});
    // just one user

};


