(function () {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);

    app.config(['$locationProvider', configFunc]);
    function configFunc($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    app.run(['$rootScope', 'AuthorizeService', '$state', runFunc]);
    function runFunc($rootScope, AuthorizeService, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            AuthorizeService.checkAuthorization().then(function () {
                var user = AuthorizeService.getUser();
                if (toState.name !== 'login' && !AuthorizeService.isAuthorized()) {
                    event.preventDefault();
                    $state.go('login');
                    toastr.warning('Please login first...');
                } else if (toState.name === 'login') {
                    if (AuthorizeService.isAuthorized()) {
                        event.preventDefault();
                        $state.go('main.resolutions');
                    } else {
                        return;
                    }
                } else if (toState.name === 'main.admin') {
                    for (var i in user.role) {
                        if (user.role[i] === 'Administrator') {
                            return;
                        }
                    }
                    event.preventDefault();
                    toastr.warning('Error: You don\'t have permission to access this page');
                    $state.go('main.resolutions');
                } else if (toState.name === 'main.facilitator') {
                    for (var j in user.role) {
                        if (user.role[j] === 'Facilitator') {
                            return;
                        }
                    }
                    event.preventDefault();
                    toastr.warning('Error: You don\'t have permission to access this page');
                    $state.go('main.resolutions');
                }
            });
        });
    }
}());