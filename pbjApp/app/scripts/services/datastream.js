/**
 * Created by skantaba on 9/15/14.
 */

angular.module('angularPassportApp')
    .factory('DataStream', function ($http) {
        var responseData={};
        return {
            setDataStream: function () {
                var obj={content:null};
                return $http.get("scripts/data/reportlist1.json").success(function(data){
                    responseData=data.data.reportpacks;
                });

            },
            getDataStream: function(){
                return responseData;
            }
            /*,
            getmetricsStream : function(cpCode){
                if(typeof(responseData.domains)=="undefined"){
                    return [];
                }

                for(var index in responseData.domains){
                    var domainObj =responseData.domains[index];
                    if(domainObj['cp-code']===cpCode){
                        return domainObj.streams;
                    }
                }
                return [];
            }*/
        }

    });
