angular.module('angularPassportApp')
    .factory('StateIdentifier', function () {
        return{
            returnStateItem: function(uri){
                return uri.replace("/items/list/","");
            },
            returnStateListItem : function(uri){
                var localUri=uri;
                var selectIndex=uri.indexOf("/select/");
                var changedUri= uri.substring(selectIndex+8,uri.length);

                if(localUri===changedUri){
                    return "";
                }
                else
                    return changedUri;
            },
            returnCpcode: function(cpCodeString){
                return cpCodeString.replace(".stream","");
            },
            returnState: function(uri){
                var localUri=uri;
                var changedUri= uri.replace("/modal/view/modalViewAdd/state/","");
                if(changedUri.indexOf("/")>=0)
                    changedUri=changedUri.substr(0,changedUri.indexOf("/"));
                if(localUri===changedUri){
                    return "";
                }
                else
                    return changedUri;
            }
        }
    });