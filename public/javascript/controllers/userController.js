app.controller("userController", function( $scope, $rootScope, $location, $http, AuthService, userService, sessionService) {

  var socket = $rootScope.socket;
  socket.on("updateUser", function(updatedUser) {
    $scope.$apply(function() {
      userService.setAllUser(updatedUser);
      $scope.allUser = userService.getAllUser();
      $scope.user = userService.getUser();
    });
  });
  
  $scope.register = function() {
    let user = {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password
    };
    let socketId = $rootScope.socket.id;
    let sendData = { user, socketId };

    $http({
      method: "POST",
      url: "api/auth/register",
      data: JSON.stringify(sendData)
    })
      .then(response => {
        console.log(response.data);
        userService.setUser(response.data);
        $location.path("/chatroom");
        $scope.user = userService.getUser();
      })
      .catch(err => {
        console.log(err);
        $scope.errorMessage = "Some error occurred!";
      });
  };

  $scope.login = function() {
    let user = {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password
    };
    let socketId = $rootScope.socket.id;
    let sendData = { user, socketId };

    $http({
      method: "POST",
      url: "/api/auth/login",
      data: JSON.stringify(sendData)
    })
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          userService.setUser(response.data);
          sessionService.createSession(response.data);
          sessionService.setAuthToken(response.headers()["x-token"]);
          $rootScope.currentUser = userService.getUser().name;
          /* $rootScope.link1 = "#!/";
          $rootScope.link2 = "#!/chatroom";
          $rootScope.link3 = "#!/logout";
          $rootScope.linkName1 = "Home";
          $rootScope.linkName2 = "Chat Room";
          $rootScope.linkName3 = "Log Out";
           */// $location.path('/chatroom');
          AuthService.go("/chatroom");
        } else {
          $scope.errorMessage =
            "Some error occurred! the user might not found!";
        }
      })
      .catch(err => {
        $scope.errorMessage = "Unauthorized access!";
      });
  };
  if(userService.getUser()){
    $rootScope.link1 = "#!/";
    $rootScope.link2 = "#!/chatroom";
    $rootScope.link3 = "#!/logout";
    $rootScope.linkName1 = "Home";
    $rootScope.linkName2 = "Chat Room";
    $rootScope.linkName3 = "Log Out";
  }else{
    $rootScope.link1 = "#!/";
    $rootScope.link2 = "#!/login";
    $rootScope.link3 = "#!/register";
    $rootScope.linkName1 = "Home";
    $rootScope.linkName2 = "Login";
    $rootScope.linkName3 = "Register";
  }
});
