'use strict';

angular.module('angularPassportApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'ui.router'
])
  .config(function ($routeProvider, $locationProvider,$stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
        .state('root', {
            url: "/main",
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'

        })

        .state('login', {
            url:'/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url:'/signup',
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        })
        .state('Placeholder1State', {
            url:'/placeholder1',
            templateUrl: 'partials/placeholders/ph1.html',
            controller: 'PlaceHolder1Ctrl'
        })



    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $location, Auth,$anchorScroll) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    },function(){
        console.log("location changed ::"+ $location.path());
    });

    // On catching 401 errors, redirect to the login page.
   /* $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
*/
  });