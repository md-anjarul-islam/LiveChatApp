app.factory('AuthService', function($location){
    var obj = {};

    obj.memorizedRoute = null;

    obj.memorize = function(route){
        obj.memorizedRoute = route;
    }

    obj.go = function (fallback){
        let targetState = obj.memorizedRoute? obj.memorizedRoute : fallback;
        $location.path(targetState);
    }

    obj.forget = function(){
        obj.memorizedRoute = null;
    }

    return obj;
})