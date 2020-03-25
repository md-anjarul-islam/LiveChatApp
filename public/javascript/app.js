var app = angular.module("app", ["ngRoute", "ngCookies"]);

app.config( function($routeProvider){
    window.routes = {
        "/": {
            controller: 'userController',
            requireLogin: false
        },
        '/register': {
            templateUrl: 'views/registerView.html',
            controller: 'userController',
            requireLogin: false
        },
        '/login': {
            templateUrl: 'views/loginView.html',
            controller: 'userController',
            requireLogin: false
        },
        '/chatroom': {
            templateUrl: 'views/chatView.html',
            redirect: '/login',
            controller: 'chatController',
            requireLogin: true
        },
        '/profile': {
            template: '<h1> Profile Page </h1>',
            redirect: '/login',
            requireLogin: true
        },
        '/logout': {
            template: '<h1>This is Logout page </h1>',
            requireLogin: true,
            redirect: "/login"
        }
    };
    
    for(path in window.routes){
        $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider.otherwise({
        redirectTo: '/',
        controller: 'userController'
    })
}).run(function($http, $rootScope, $location, sessionService, AuthService){    
    $rootScope.$on("$locationChangeStart", 
    function(event, next, current){
       
        if( !!sessionService.getAuthToken() ){
            if(next.indexOf("login") != -1 || next.indexOf("register") != -1){
                $location.path("/");
                return;
            }
        }

        for(let route in window.routes){
            if(next.indexOf(route) !=-1 ){
                if(window.routes[route].requireLogin && !sessionService.getAuthToken()){
                    AuthService.memorize(route);
                    let nextPath = window.routes[route].redirect || "/login";
                    $location.path(nextPath);
                    break;
                }                
            }
        }
        console.log("event triggered", next, current);
    });
})
