var app = angular.module("app", ["ngRoute", "ngCookies"]);

app
  .config(function($routeProvider) {
    window.routes = {
      "/": {
        controller: "userController",
        requireLogin: false
      },
      "/register": {
        templateUrl: "views/registerView.html",
        controller: "userController",
        requireLogin: false,
        hideFromUser: true
      },
      "/login": {
        templateUrl: "views/loginView.html",
        controller: "userController",
        requireLogin: false,
        hideFromUser: true
      },
      "/chatroom": {
        templateUrl: "views/chatView.html",
        redirect: "/login",
        controller: "chatController",
        requireLogin: true
      },
      "/profile": {
        template: "<h1> Profile Page </h1>",
        redirect: "/login",
        requireLogin: true
      },
      "/logout": {
        template: "<h1>This is Logout page </h1>",
        requireLogin: true,
        redirect: "/login"
      }
    };

    for (path in window.routes) {
      $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider.otherwise({
      redirectTo: "/",
      controller: "userController"
    });
  })
  .run(function($http, $rootScope, $location, sessionService, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      let routePath = next.$$route.originalPath;

      if ( !!sessionService.getAuthToken() && window.routes[routePath].hideFromUser == true ) {
          $location.path("/");
          return;
      }

      if (window.routes[routePath].requireLogin && !sessionService.getAuthToken()) {
        AuthService.memorize(routePath);
        let nextPath = window.routes[routePath].redirect || "/login";
        $location.path(nextPath);
      }
    });
  });
