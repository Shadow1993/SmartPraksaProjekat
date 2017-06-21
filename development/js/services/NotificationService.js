(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('NotificationService', [NotificationService]);
    function NotificationService() {
        var prefixes = {
            error: '[Error] ',
            auth: '[Auth] ',
            validation: '[Validation] ',
            info: '[Info] '
        };
        return {
            error: {
                generic: prefixes.error + 'Something broke.. call your administrator.. or a plumber..'
            },
            auth: {
                fail: prefixes.auth + 'You are not logged in.. Please log in first.',
                success: prefixes.auth + 'Welcome!',
                perm: prefixes.auth + 'You aren\'t authorized to do that..',
                logout: prefixes.auth + 'COWARD!!',
                invalid: prefixes.auth + 'Wrong Username and/or Password.'
            },
            validation: {
                empty: prefixes.validation + 'Please fill out the required form fields..'
            },
            info: {
                test: prefixes.info + 'Test!'
            }
        };
    }
}());