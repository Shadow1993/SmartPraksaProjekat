(function () {
    'use strict';

    var app = angular.module('app');

    app.config(function ($stateProvider, $urlRouterProvider) {

        //State Definition
        var states = {
            home: {
                name: 'home',
                abstract: 'true',
                views: {
                    '@': {
                        templateUrl: './../templates/home.html'
                    },
                    'header@home': {
                        templateUrl: './../templates/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'header'
                    },
                    'main@home': {
                        templateUrl: './../templates/main.html'
                    }
                }
            },
            main: {
                name: 'main',
                abstract: true,
                parent: 'home',
                templateUrl: './../templates/main.html'
            },
            test: {
                name: 'test',
                url: '/test',
                template: 'TESTING'
            },
            login: {
                name: 'login',
                url: '/login',
                templateUrl: './../templates/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            },
            logout: {
                name: 'logout',
                url: '/logout',
                template: null,
                controller: 'LogoutController'
            }
        };
        // State Initialization
        $stateProvider
            .state(states.home)
            .state(states.main)
            // TESTING PURPOSES ROOT
            .state(states.test)
            .state(states.logout)
            .state(states.login);

        // Default Redirect
        $urlRouterProvider.otherwise('/login');

    });
}());
