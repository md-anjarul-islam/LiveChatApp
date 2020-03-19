app.factory('sessionService', function(){
    var obj = {};

    obj.createSession = function(userId){
        sessionStorage.setItem('userId', userId);
    }

    obj.clearSession = function(){
        sessionStorage.clear();
    }

    obj.getAuthUser = function(){
        return sessionStorage.getItem('userId');
    }

    return obj;
})