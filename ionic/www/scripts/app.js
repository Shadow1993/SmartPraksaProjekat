(function () {
    'use strict';

    //Define new module (Create app)
    // var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);
    var app = angular.module('app', ['ionic', 'ui.bootstrap']);

    //Application configuration Don't enable for IONIC, needs to be independant
    // app.config(['$locationProvider', configFunc]);
    // function configFunc($locationProvider) {
    //     //Enable html5 mode (Nicer URL's, no HashBang)
    //     $locationProvider.html5Mode(true);
    // }

    app.run(['$rootScope', 'AuthorizeService', '$state', 'NotificationService', '$ionicPlatform', runFunc]);
    function runFunc($rootScope, AuthorizeService, $state, NotificationService, $ionicPlatform) {

        //IONIC
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        //Execute when changing states
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            //Check with service if user is logged in
            AuthorizeService.checkAuthentication()
                .then(Authenticated);

            //If user is logged in then
            function Authenticated() {
                var user = AuthorizeService.getUser();
                if (toState.name !== 'login' && !AuthorizeService.isAuthorized()) {
                    event.preventDefault();
                    $state.go('login');
                    //Message telling user he needs to login before accessing other pages
                    toastr.warning(NotificationService.auth.fail);
                } else if (toState.name === 'login' && AuthorizeService.isAuthorized()) {
                    event.preventDefault();
                    $state.go('main.resolutions');
                } else if (toState.name === 'main.admin') {
                    CheckPermission(user.role, 'Administrator');
                } else if (toState.name === 'main.facilitator') {
                    CheckPermission(user.role, 'Facilitator');
                }
            }

            //Checks and handles if user has access based on permissions on a role
            function CheckPermission(roles, perm) {
                for (var i in roles) {
                    if (roles[i] === perm) {
                        return;
                    }
                }
                event.preventDefault();
                $state.go('main.resolutions');
                //Message if user doesn't have required permissions
                toastr.warning(NotificationService.auth.perm);
            }
        });
    }
}());