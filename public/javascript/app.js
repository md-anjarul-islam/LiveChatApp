var app = angular.module("app", ["ngRoute"]);

app.config( function($routeProvider){
    $routeProvider
        .when('/login', {
            templateUrl: 'html/loginView.html',
            controller: 'chatController'
        })
        .when('/chatroom', {
            templateUrl: 'html/chatView.html',
            controller: 'chatController'
        })
        .otherwise({
            redirectTo: '/',
            controller: 'chatController'
        })
})
