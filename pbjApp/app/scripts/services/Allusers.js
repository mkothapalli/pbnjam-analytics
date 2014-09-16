'use strict';
angular.module('angularPassportApp')
    .factory('Allusers', function ($resource) {
        return $resource('/auth/users/bookmarks/:bookmarkId',{},{ getUsersForBookmark:{method: 'GET',params:{bookmarkId:'@id'}, isArray:true}});

});


