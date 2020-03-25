app.factory("sessionService", function() {
  var obj = {};

  obj.setAuthToken = function(token) {
    localStorage.setItem("authToken", token);
  };

  obj.getAuthToken = function() {
    return localStorage.getItem("authToken");
  };

  obj.clearAuthToken = function() {
    localStorage.removeItem("authToken");
  };

  obj.createSession = function(user) {
    localStorage.setItem("user", JSON.stringify(user));
  };

  obj.clearSession = function() {
    localStorage.removeItem("user");
  };

  obj.getAuthUser = function() {
    return JSON.parse(localStorage.getItem("user"));
  };

  return obj;
});
