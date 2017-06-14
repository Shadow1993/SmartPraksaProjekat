(function () {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

    app.config(['$locationProvider', configFunc]);
    function configFunc($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    app.run(['$rootScope', 'AuthorizeService', runFunc]);
    function runFunc($rootScope, AuthorizeService) {
        $rootScope.$on('$stateChangeStart', function() {
            console.log('Valid session: ' + AuthorizeService.isAuthorized());
        });
    }
}());
