(function () {
    'use strict';

    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', configFunc]);
    function configFunc($stateProvider, $urlRouterProvider) {

        //State Definition
        var states = {
            test: {
                name: 'test',
                url: '/test',
                templateUrl: './../templates/test.html'
            },
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
            },
            admin: {
                name: 'main.admin',
                url: '/admin',
                templateUrl: './../templates/admin.html',
                controller: 'AdminController',
                controllerAs: 'admin'
            },
            facilitator: {
                name: 'main.facilitator',
                url: '/facilitator',
                templateUrl: './../templates/facilitator.html',
                controller: 'FacilitatorController',
                controllerAs: 'facilitator'
            },
            activeListing: {
                name: 'main.activeListing',
                url: '/activelisting',
                templateUrl: './../templates/activelisting.html',
                controller: 'ActiveListingController',
                controllerAs: 'activeListing'
            },
            archivedListing: {
                name: 'main.archivedListing',
                url: '/archivedlisting',
                templateUrl: './../templates/archivedlisting.html',
                controller: 'ArchivedListingController',
                controllerAs: 'archivedListing'
            }
        };
        // State Initialization
        $stateProvider
        // TESTING PURPOSES ROOT
            .state(states.test)
            .state(states.home)
            .state(states.main)
            .state(states.logout)
            .state(states.login)
            .state(states.admin)
            .state(states.facilitator)
            .state(states.activeListing)
            .state(states.archivedListing);

        // Default Redirect
        $urlRouterProvider.otherwise('/login');

    }
}());
