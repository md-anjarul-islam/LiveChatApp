var app = angular.module("app", ["ngRoute"]);

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
            controller: 'chatController',
            requireLogin: true
        },
        '/logout': {
            template: '<h1>This is Logout page </h1>',
            controller: 'userController',
            requireLogin: false
        }
    };
    
    for(path in window.routes){
        $routeProvider.when(path, window.routes[path]);
    }

    $routeProvider.otherwise({
        redirectTo: '/',
        controller: 'userController'
    })
}).run(function($rootScope, sessionService){
    $rootScope.$on("$locationChangeStart", 
    function(event, next, current){
        for(let route in window.routes){
            if(next.indexOf(route) !=-1 ){
                if(window.routes[route].requireLogin && !sessionService.getAuthUser()){
                    console.log("Requested for authorized route");
                    event.preventDefault();
                }
            }
        }
        console.log("event triggered", next, current);
    });
})
