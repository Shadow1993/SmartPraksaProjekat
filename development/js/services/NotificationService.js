(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('NotificationService', [NotificationService]);
    function NotificationService() {
        return {
            error: {
                generic: '[Error] Something broke.. call your administrator.. or a plumber..'
            },
            auth: {
                fail: '[Auth] You are not logged in.. Please log in first.',
                success: '[Auth] Welcome!',
                perm: '[Auth] You aren\'t authorized to do that..',
                logout: '[Auth] COWARD!!'
            },
            info: {
                test: '[Info] Test'
            }
        };
    }
}());