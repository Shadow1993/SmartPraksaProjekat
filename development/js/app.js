(function () {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);

    app.config(['$locationProvider', configFunc]);
    function configFunc($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    // app.run(['$rootScope', 'AuthorizeService', '$state', runFunc]);
    // function runFunc($rootScope, AuthorizeService, $state) {
    //     $rootScope.$on('$stateChangeStart', function(event, toState) {
    //         var state = toState.name,
    //             auth = AuthorizeService.isAuthorized();

    //         if (state === 'login') {
    //             if (auth) {
    //                 event.preventDefault();
    //                 $state.go('main.resolutions');
    //             } else {
    //                 return;
    //             }
    //         } else {
    //             if (auth) {
    //                 return;
    //             } else {
    //                 event.preventDefault();
    //                 $state.go('login');
    //                 toastr.warning('Please login first...');
    //             }
    //         }
    //     });
    // }
}());
