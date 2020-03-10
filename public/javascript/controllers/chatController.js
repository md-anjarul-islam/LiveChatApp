app.controller("chatController", function($scope, $rootScope, $http) {
  var socket = io();

  $scope.register = function(){
    let user = {
      name: $scope.name,
      password: $scope.password
    }
    let socketId = socket.id;
    let sendData = {user, socketId};

    $http({
      method: "POST",
      url: "api/register",
      data: JSON.stringify(sendData)
    }).then( (response) =>{
      console.log(response.data);
      $scope.userInfo = response.data;
    }).catch(err=>console.log(err));
  }

  $scope.login = function() {
    let user = {
      _id: 21637996,
      name: $scope.name,
      password: $scope.password,
    };
    let socketId = socket.id;
    let sendData = {user, socketId};

    $http({
      method: "POST",
      url: "/api/login",
      data: JSON.stringify(sendData)
    })
      .then(response => {
        $scope.user = response.data;
        console.log(response.data);
        $rootScope.link1 = "#!/";
        $rootScope.link2 = "#!/chatroom";
        $rootScope.link3 = "#!/logout";
        $rootScope.linkName1 = "Home";
        $rootScope.linkName2 = "Chat Room";
        $rootScope.linkName3 = "Log Out";
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
