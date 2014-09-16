'use strict';

var mongoose = require('mongoose'),
    Bookmark = mongoose.model('Bookmark');
var User;
User = mongoose.model('User')

/**
 * Find bookmark by id
 */
exports.bookmark = function(req, res, next, id) {
    Bookmark.load(id, function(err, bookmark) {
        if (err) return next(err);
        if (!bookmark) return next(new Error('Failed to load bookmark ' + id));
        req.bookmark = bookmark;
        next();
    });
};

/**
 * Create a bookmark
 */
exports.create = function(req, res) {
    var bookmark = new Bookmark(req.body);
    bookmark.owner = req.user;

    bookmark.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(bookmark);
        }
    });
};
exports.createShared = function(req, res) {
    var bookmark = new Bookmark(req.body);
    bookmark.creator=req.user;
    var ownerUser = new User(req.body.owner);
    var actualbookmarkModel= new Bookmark(req.body.actualbookmark);
    bookmark.owner = ownerUser;
    bookmark.actualbookmark =actualbookmarkModel;
    bookmark.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(bookmark);
        }
    });
};
/**
 * Update a bookmark
 */
exports.update = function(req, res) {
    var bookmark = req.bookmark;
    bookmark.name = req.body.name;
    bookmark.link = req.body.link;
    bookmark.save(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(bookmark);
        }
    });
};

/**
 * Delete a bookmark
 */
exports.destroy = function(req, res) {
    var bookmark = req.bookmark;

    bookmark.remove(function(err) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(bookmark);
        }
    });
};

/**
 * Show a bookmark
 */
exports.show = function(req, res) {
    res.json(req.bookmark);
};

/**
 * List of Bookmarks
 */
exports.all = function(req, res) {
    if(typeof(req._passport.session.user)!="undefined" ) {
        Bookmark.find({owner: {$in: [req._passport.session.user.toString()]}}).sort('-created').populate('owner', 'username').exec(function (err, bookmarks) {
            if (err) {
                res.json(500, err);
            } else {
                res.json(bookmarks);
            }
        });
    }
};
//  a new method to share bookmarks with other users
exports.share = function(req,res){


}
