app.controller('initializer', function($scope, $rootScope, $location, sessionService){
    $rootScope.init = function(){
        $rootScope.socket = io();
        if(sessionService.getAuthUser()){
            $rootScope.userLoggedIn = true;
            $rootScope.currentUser = sessionService.getAuthUser().name;
        } else{
            $rootScope.userLoggedIn = false;
        }
    }
    $rootScope.logout = function(){
        sessionService.clearSession();
        sessionService.clearAuthToken();
        $rootScope.userLoggedIn = false;
        $location.path("/");
      }
})