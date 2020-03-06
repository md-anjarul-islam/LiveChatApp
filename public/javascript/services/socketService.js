app.factory("socketService", function() {
var socket = io();
  return {
    sendMessage : function(message){
        socket.emit("newMessage", message);
    }
  };
});
