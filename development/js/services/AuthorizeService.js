(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('AuthorizeService', ['$http', 'HandlingService', '$state', AuthorizeService]);
    function AuthorizeService($http, HandlingService, $state) {

        var api = {
            login: '/login',
            info: '/checkLogin'
        };

        var user = {
            username: '',
            role: []
        };

        var auth = null;

        checkAuthorization();

        function authorize(data) {
            return $http({
                method: 'POST',
                url: api.login,
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                }
            })
                .then(LoginFunction)
                .catch(HandlingService.ReturnError);
        }

        function LoginFunction() {
            checkAuthorization();
            $state.go('main.resolutions');

            HandlingService.ReturnSuccess();
        }

        function deauthorize() {
            $http.get('/logout');
            user = {
                username: '',
                role: []
            };
            toastr.info('Logged out');
            $state.go('login');
        }

        function checkAuthorization() {
            return $http.get(api.info)
                .then(checkAuth)
                .catch(HandlingService.ReturnError);
        }

        function isAuthorized() {
            return auth;
        }
        function checkAuth(res) {
            if (res.data.user) {
                setUser(res);
                auth = true;
            } else {
                auth = false;
            }
        }
        function setUser(res) {
            user.username = res.data.user.username;
            for (var i in res.data.role) {
                user.role.push(res.data.role[i].title);
            }
        }

        function getUser() {
            return user;
        }

        return {
            checkAuthorization: checkAuthorization,
            isAuthorized: isAuthorized,
            authorize: authorize,
            deauthorize: deauthorize,
            getUser: getUser
        };
    }
}());