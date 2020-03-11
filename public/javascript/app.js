var app = angular.module("app", ["ngRoute"]);

app.config( function($routeProvider){
    $routeProvider
        .when('/register', {
            templateUrl: 'views/registerView.html',
            controller: 'userController'
        })
        .when('/login', {
            templateUrl: 'views/loginView.html',
            controller: 'userController'
        })
        .when('/chatroom', {
            templateUrl: 'views/chatView.html',
            controller: 'chatController'
        })
        .otherwise({
            redirectTo: '/',
            controller: 'chatController'
        })
})
