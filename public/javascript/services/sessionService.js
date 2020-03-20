app.factory("sessionService", function() {
  var obj = {};

  obj.setAuthToken = function(token) {
    sessionStorage.setItem("authToken", token);
  };

  obj.getAuthToken = function() {
    return sessionStorage.getItem("authToken");
  };

  obj.clearAuthToken = function() {
    sessionStorage.removeItem("authToken");
  };

  obj.createSession = function(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  obj.clearSession = function() {
    sessionStorage.removeItem("user");
  };

  obj.getAuthUser = function() {
    return JSON.parse(sessionStorage.getItem("user"));
  };

  return obj;
});
