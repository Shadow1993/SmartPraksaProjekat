(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('AuthorizeService', ['$http', 'HandlingService', '$state', AuthorizeService]);
    function AuthorizeService($http, HandlingService, $state) {

        var api = {
            login: '/login',
            info: '/checkLogin'
        };

        $http.get(api.info).then(function(res) {console.log(res);});

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

        function LoginFunction(response) {
            console.log(response);

            $state.go('main.resolutions');

            HandlingService.ReturnSuccess();
        }

        function deauthorize() {
            $http.get('/logout');
            toastr.info('Logged out');
            $state.go('login');
        }

        function isAuthorized() {
            if (window.sessionStorage.getItem('userid')) {
                return true;
            } else {
                return false;
            }
        }

        return {
            isAuthorized: isAuthorized,
            authorize: authorize,
            deauthorize: deauthorize
        };
    }
}());