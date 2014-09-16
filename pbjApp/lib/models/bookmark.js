'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    link: {
        type: String,
        default: '',
        trim: true
    },
    created: Date,
    updated: [Date],
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    creator:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    actualbookmark : {
        type:Schema.ObjectId,
        ref:'Bookmark'

    }

});

/**
 * Pre hook.
 */

BookmarkSchema.pre('save', function(next, done){
    if (this.isNew)
        this.created = Date.now();

    this.updated.push(Date.now());

    next();
});

/**
 * Statics
 */
BookmarkSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('owner', 'username').exec(cb);
    }
};

/**
 * Methods
 */

BookmarkSchema.statics.findByName = function (name, callback) {
    return this.find({ name: name }, callback);
}
BookmarkSchema.statics.findByOwner = function (owner, callback) {
    return this.find({ owner: owner }, callback);
}
BookmarkSchema.statics.findByCreator = function (creator, callback) {
    return this.find({ creator: creator }, callback);
}
BookmarkSchema.statics.findByActualBookmark = function (bookmark, callback) {
    return this.find({ actualbookmark: bookmark }, callback);
}
BookmarkSchema.methods.expressiveQuery = function (owner, date, callback) {
    return this.find('owner',owner).where('date').gte(date).run(callback);
}

mongoose.model('Bookmark', BookmarkSchema);