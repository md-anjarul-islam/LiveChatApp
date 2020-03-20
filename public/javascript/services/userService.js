app.factory("userService", function() {
  var obj = {};
  obj.messages = [];
  obj.allUser = [];
  obj.users = {};

  obj.setUser = function(user) {
    obj.currentUser = user;
  };

  obj.getUser = function() {
    return obj.currentUser;
  };

  obj.setAllUser = function(allUser) {
    obj.allUser = allUser;
    obj.users = {};
    // obj.allUser is also an object which is a key-value pair.
    // the key here is the userId and the value is the user itself
    let userId = null;
    allUser.forEach( user => {
      userId = user._id;
      user.messageCount = 0;
      obj.users[userId] = user;
    });
  };

  obj.getAllUser = function() {
    return obj.allUser;
  };

  obj.getUserById = function(userId){
    return obj.users[userId];
  }

  obj.initMessage = function(messages, userId){
    obj.messages = messages;
    obj.users[userId].messageCount = 0;
  }
  
  obj.pushMessage = function(newMessage){
    obj.messages.push(newMessage);
  }

  obj.getMessages = function(){
    return obj.messages;
  }

  obj.setMessageCount = function(userId){
    obj.users[userId].messageCount++;
  }

  obj.getMessageCount = function(userId){
    return obj.users[userId].messageCount;
  }

  return obj;
});
