app.factory("userService", function() {
  var obj = {};
  obj.messages = [];
  obj.allUser = [];
  obj.users = new Map();

  obj.setUser = function(user) {
    obj.currentUser = user;
  };

  obj.getUser = function() {
    return obj.currentUser;
  };

  obj.setAllUser = function(allUser) {
    obj.allUser = allUser;
    
    allUser.forEach( user => {
      user.messageCount = 0;
      obj.users.set(user._id, user)
    });
  };

  obj.getAllUser = function() {
    return obj.allUser;
  };

  obj.getUserById = function(userId){
    return obj.users.get(userId);
  }

  obj.initMessage = function(messages, userId){
    obj.messages = messages;
    obj.users.get(userId).messageCount = 0;
  }
  
  obj.pushMessage = function(newMessage){
    obj.messages.push(newMessage);
  }

  obj.getMessages = function(){
    return obj.messages;
  }

  obj.setMessageCount = function(userId){
    obj.users.get(userId).messageCount++;
  }

  obj.getMessageCount = function(userId){
    return obj.users.get(userId).messageCount;
  }

  return obj;
});
