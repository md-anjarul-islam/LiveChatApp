app.controller('initializer', function($scope, $rootScope){
    $scope.init = function(){
        $rootScope.socket = io();
        $rootScope.link1 = "home";
        $rootScope.link2 = "login";
        $rootScope.link3 = "register";
        
        $rootScope.linkName1 = "Home";
        $rootScope.linkName2 = "Login";
        $rootScope.linkName3 = "Register";
    }
})