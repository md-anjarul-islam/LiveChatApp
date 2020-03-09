app.controller('initializer', function($scope, $rootScope){
    $scope.init = function(){
        $rootScope.link1 = "#!/";
        $rootScope.link2 = "#!/login";
        $rootScope.link3 = "#!/chatroom";
        
        $rootScope.linkName1 = "Home";
        $rootScope.linkName2 = "Login";
        $rootScope.linkName3 = "Chat Room";
    }
})