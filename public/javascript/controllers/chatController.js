app.controller("chatController", function($scope, $rootScope, $http, $location, userService) {
  var socket = $rootScope.socket;
 
  socket.on("updateMessage", function(updatedMessage) {
    console.log("updatedMessage", updatedMessage);
    $scope.$apply(function() {
      userService.allMessage = updatedMessage;
    });
  });

  socket.on("updateUser", function(updatedUser) {
    console.log("updatedUser", updatedUser);
    $scope.$apply(function() {
      userService.setAllUser(updatedUser);
      $scope.allUser = userService.getAllUser();
      $scope.user = userService.getUser();
    });
  });

  $scope.sendMessage = function() {
    let messageDetails = {
      from: $scope.user.name,
      message: $scope.message,
      socketId: socket.id
    };

    $http({
      method: "POST",
      url: "/api/messages",
      data: messageDetails
    })
      .then(response => {
        $scope.allMessage = response.data;
      })
      .catch(err => {
        alert(err.message);
      });
  };
});
