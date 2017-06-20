(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('AuthorizeService', ['$http', 'HandlingService', '$state', AuthorizeService]);
    function AuthorizeService($http, HandlingService, $state) {

        //API URL's
        var api = {
            login: '/login',
            info: '/checkLogin'
        };

        //Storing Logged in User
        var user = {
            id: '',
            username: '',
            role: []
        };

        //User Authentication Storing
        var auth = null;

        checkAuthentication();

        //Login User
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
        //After Logging in..
        function LoginFunction() {
            checkAuthentication();
            $state.go('main.resolutions');

            HandlingService.ReturnSuccess();
        }

        //Logout User
        function deauthorize() {
            return $http.get('/logout')
                .then(function () {
                    user = {
                        id: '',
                        username: '',
                        role: []
                    };
                    toastr.info('Logged out');
                    return $state.go('login');
                });
        }

        //Check if User is Logged in
        function checkAuthentication() {
            return $http.get(api.info)
                .then(checkAuth)
                .catch(HandlingService.ReturnError);
        }
        function checkAuth(res) {
            if (res.data.user) {
                setUser(res);
                auth = true;
            } else {
                auth = false;
            }
        }

        //Set info gathered from server within service
        function setUser(res) {
            user.id = res.data.user._id;
            user.username = res.data.user.username;
            for (var i in res.data.role) {
                user.role.push(res.data.role[i].title);
            }
        }

        //Return If there's a logged in user
        function isAuthorized() {
            return auth;
        }

        //Return stored User Info
        function getUser() {
            return user;
        }

        return {
            checkAuthentication: checkAuthentication,
            isAuthorized: isAuthorized,
            authorize: authorize,
            deauthorize: deauthorize,
            getUser: getUser
        };
    }
}());