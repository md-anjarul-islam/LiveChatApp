app.controller("userController", function( $scope, $rootScope, $location, $http, userService, $state) {

  var socket = $rootScope.socket;
  socket.on("updateUser", function(updatedUser) {
    console.log("updatedUser", updatedUser);
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
      url: "api/register",
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
      url: "/api/login",
      data: JSON.stringify(sendData)
    })
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          userService.setUser(response.data);
          $state.go('chatroom');
          $rootScope.link1 = "home";
          $rootScope.link2 = "chatroom";
          $rootScope.link3 = "logout";
          $rootScope.linkName1 = "Home";
          $rootScope.linkName2 = "Chat Room";
          $rootScope.linkName3 = "Log Out";
        } else {
          $scope.errorMessage =
            "Some error occurred! the user might not found!";
        }
      })
      .catch(err => {
        $scope.errorMessage = "Unauthorized access!";
      });
  };
});
