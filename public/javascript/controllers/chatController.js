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
    let sendData = {
      id1: userService.currentUser._id,
      id2: $scope.friend._id        
    };

    $http({
      method: "POST",
      url: "api/users/message",
      data: JSON.stringify(sendData)
    })
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
    let sendData = {
      id1: userService.currentUser._id,      
      id2: $scope.friend._id,        
      message: $scope.message      
    };

    $http({
      method: "POST",
      url: "/api/users/messages",
      data: JSON.stringify(sendData)
    })
      .then(response => {
        userService.pushMessage(response.data);
        $scope.allMessage = userService.getMessages();
      })
      .catch(err => {
        alert(err.message);
      });
  };
});
