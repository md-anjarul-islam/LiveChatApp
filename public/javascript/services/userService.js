app.factory("userService", function() {
  var obj = {};

  obj.setUser = function(user) {
    obj.user = user;
  };

  obj.getUser = function() {
    return obj.user;
  };

  obj.setAllUser = function(allUser) {
    obj.allUser = allUser;
  };

  obj.getAllUser = function() {
    return obj.allUser;
  };

  return obj;
});
