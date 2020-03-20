app.controller("chatController", function($scope, $rootScope, $http, $location, userService) {
  var socket = $rootScope.socket;

  socket.on("updateMessage", function(updatedMessage) {
    console.log("updatedMessage", updatedMessage);
    $scope.$apply(function() {
      userService.pushMessage(updatedMessage);
      $scope.allMessage = userService.getMessages();
    });
  });
  $scope.allUser = userService.getAllUser();

  socket.on("updateUser", function(updatedUser) {
    console.log("updatedUser", updatedUser);
    $scope.$apply(function() {
      userService.setAllUser(updatedUser);
      $scope.allUser = userService.getAllUser();
      $scope.user = userService.getUser();
    });
  });

  $scope.findName = function(userId){
    if(userId == userService.currentUser._id)
      return "You";
    else
      return $scope.friend.name;
  }

  $scope.selectFriend = function(frinedId) {
    $scope.friend = userService.getUserById(frinedId);
    let url = `api/users/${$scope.friend._id}/messages`;
    $http.get(url)
      .then(response => {
        userService.initMessage(response.data);
        $scope.allMessage = userService.getMessages();
      })
      .catch(err => {
        console.log(err);
        $scope.messageDetails = [];
      });
  };

  $scope.sendMessage = function() {
    let message = $scope.message;
    $scope.message = "";
    let url = `api/users/${$scope.friend._id}/messages`;
    $http.post(url, JSON.stringify( { message } ))
      .then(response => {
        userService.pushMessage(response.data);
        $scope.allMessage = userService.getMessages();
      })
      .catch(err => {
        alert(err.message);
      });
  };
});
