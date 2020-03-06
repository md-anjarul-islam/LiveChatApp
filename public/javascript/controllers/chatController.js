app.controller("chatController", function($scope, $http, socketService) {
    
    $scope.sendMessage = function(msg) {
        messageDetails = {
            from: $scope.name,
            message: $scope.message
        }
      socketService.sendMessage(messageDetails);
    };
    // socketService.on();

    socket.on("updateMessage", function(messages) {
      $scope.$apply(function() {
        $scope.allMessage = messages;
      });
    });
  });