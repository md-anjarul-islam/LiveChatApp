app.factory('AuthService', function($http){
    var obj = {};

    obj.login = function(credentials){
        $http.post('api/login', credentials)
    }
})