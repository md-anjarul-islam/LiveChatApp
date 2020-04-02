app.controller("chatController", function(
  $scope,
  $rootScope,
  $http,
  sessionService,
  userService
) {

  console.log("loading chatController");
    
  var socket = $rootScope.socket;
  $scope.messageCount = {};

  socket.on("updateMessage", function(updatedMessage) {
    console.log("updatedMessage", updatedMessage);
    $scope.$apply(function() {
      if ($scope.friend && $scope.friend._id == updatedMessage.fromUserId) {
        userService.pushMessage(updatedMessage);
        $scope.allMessage = userService.getMessages();
      } else {
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

  $scope.init = async function() {
    console.log("Initializing chatcontroller");
    let request = {
      method: "GET",
      url: "api/users/",
      headers: {
        authtoken: sessionService.getAuthToken()
      }
    };

    try {
      let response = await $http(request);
      sessionService.createSession(response.data);
      $scope.$apply(function(){
        $rootScope.currentUser = response.data.name;
        userService.setUser(response.data);
      })

      request = {
        method: "GET",
        url: "api/users",
        headers: {
          authtoken: sessionService.getAuthToken()
        }
      };
      response = await $http(request);
      console.log($scope.allUser);
      userService.setAllUser(response.data);
      $scope.$apply(function(){
        $scope.allUser = userService.getAllUser();
        console.log($scope.allUser);
      })
    } catch (err) {
      sessionService.clearAuthToken();
      sessionService.clearSession();
      console.log(err);
    }
    $scope.$apply(function(){
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
  })
  };

  $scope.findName = function(userId) {
    if (userId == userService.currentUser._id) return "You";
    else return $scope.friend.name;
  };

  $scope.selectFriend = function(frinedId) {
    $scope.friend = userService.getUserById(frinedId);
    let url = `api/messages/${$scope.friend._id}`;
    $http({
      method: "GET",
      headers: {
        authtoken: sessionService.getAuthToken()
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
    let url = `api/messages/${$scope.friend._id}`;
    $http({
      method: "POST",
      headers: {
        authToken: sessionService.getAuthToken()
      },
      url: url,
      data: JSON.stringify({ message })
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
