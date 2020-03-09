app.controller('initializer', function($scope){
    $scope.init = function(){
        $scope.link1 = "#!/";
        $scope.link2 = "#!/login";
        $scope.link3 = "#!/chatroom";
        
        $scope.linkName1 = "Home";
        $scope.linkName2 = "Login";
        $scope.linkName3 = "Chat Room";
    }
})