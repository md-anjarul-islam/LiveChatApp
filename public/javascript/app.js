var app = angular.module("app", []);

app.controller('chatController', function($scope){
    var socket = io();
    
    socket.on('connect', function(){        /// on connect, get the user information from server
        socket.on("userInfo", function(userInfo){
            $scope.user = userInfo;
        })
    });

    socket.on('reconnect', function(){
        alert("reconnected user");
    })
    
    socket.on("updateMessage", function(updatedMessage){
        $scope.$apply(function(){
            $scope.allMessage = updatedMessage;
        })
    })

    $scope.sendMessage = function(message){
        let messageDetails = {
            from: $scope.name,
            message: $scope.message
        };
        socket.emit("newMessage", messageDetails);
    }
})