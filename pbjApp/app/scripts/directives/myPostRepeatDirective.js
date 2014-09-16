'use strict';
angular.module('angularPassportApp')
    .directive('myPostRepeatDirective', function($location,$anchorScroll) {
        return function($scope,element, attrs) {

            var myWatcher=$scope.$watch("domain['cp-code']",function(newValue,oldValue,scope){

                var hashLocation =$location.$$hash;
                if("cpcode"+newValue===hashLocation) {
                    if (hashLocation.length > 0) {

                        $location.hash(hashLocation);
                        $anchorScroll();
                        $scope.hashLocationValue = hashLocation;
                        myWatcher();

                    }
                }
            });
        };
    });