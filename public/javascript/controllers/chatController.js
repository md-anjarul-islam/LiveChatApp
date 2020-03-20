app.controller("chatController", function($scope, $rootScope, $http, sessionService, userService) {
  var socket = $rootScope.socket;
  $scope.messageCount = {};
  
  socket.on("updateMessage", function(updatedMessage) {
    console.log("updatedMessage", updatedMessage);
    $scope.$apply(function() {
      if($scope.friend && $scope.friend._id == updatedMessage.fromUserId){
        userService.pushMessage(updatedMessage);
        $scope.allMessage = userService.getMessages();
      } else{
        userService.setMessageCount(updatedMessage.fromUserId);
        $scope.messageCount[updatedMessage.fromUserId] = userService.getMessageCount(updatedMessage.fromUserId);
      }
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
    $http({
      method: "GET",
      headers: {
        "authtoken": sessionService.getAuthToken()
      },
      url: url
    })
      .then(response => {
        userService.initMessage(response.data, frinedId);
        $scope.allMessage = userService.getMessages();
        $scope.messageCount[frinedId] = userService.getMessageCount(frinedId);
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
    $http({
      method: "POST",
      headers: {
        "authToken": sessionService.getAuthToken()
      },
      url: url,
      data: JSON.stringify( { message } )
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
