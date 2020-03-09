app.controller("chatController", function($scope, $http) {
  var socket = io();

  $scope.login = function() {
    let user = {
      name: $scope.name,
      password: $scope.password,
      socketId: socket.id
    };

    $http({
      method: "POST",
      url: "/api/login",
      data: JSON.stringify(user)
    })
      .then(response => {
        $scope.user = response.data;
      })
      .catch(err => {
        $scope.errorMessage = err.message;
      });
  };

  socket.on("updateMessage", function(updatedMessage) {
    $scope.$apply(function() {
      $scope.allMessage = updatedMessage;
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
