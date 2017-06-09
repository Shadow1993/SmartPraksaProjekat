(function () {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

    app.config(['$locationProvider', configFunc]);
    function configFunc($locationProvider) {
        $locationProvider.html5Mode(true);
    }
}());
