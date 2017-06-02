(function () {
    'use strict';

    var app = angular.module('app', []);

    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
}());
