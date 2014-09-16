'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location,$rootScope,$window) {
    $scope.menu = [{
        "title": "Event Data",
        "link":"Placeholder1State"


    }

        ];

    $scope.authMenu = [
       {
        "title": "Placeholder2",
        "link":"Placeholder2State"
    },
    {
        "title": "Placeholder3",
        "link":"Placeholder3State"
    }
    ];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
          $location.path('/login');
      });

    };
    $scope.routingTab = function(){
        $location.parentLink=location.href;
        $rootScope.$broadcast("parentLink",location.href);
        $window.sessionStorage.setItem("parentLink",location.href);

    }


    });
