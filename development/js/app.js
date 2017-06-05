(function () {
    'use strict';

    var app = angular.module('app', ['ui.router']);

    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
}());
