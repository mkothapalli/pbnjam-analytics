'use strict';
angular.module('angularPassportApp')
    .factory('Oneuser', function ($resource) {
        return $resource('/auth/users/:username/',{},{ getUser:{method: 'get', isArray:false}});

    });
