var app = angular.module("app", ["ui.router"]);

app.config( function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'userController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/registerView.html',
            controller: 'userController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/loginView.html',
            controller: 'userController'
        })
        .state('chatroom', {
            url: '/chatroom',
            templateUrl: 'views/chatView.html',
            controller: 'chatController'
        })
        $urlRouterProvider.otherwise('/')
})
