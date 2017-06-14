(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('AuthorizeService', ['$http', 'HandlingService', AuthorizeService]);
    function AuthorizeService($http, HandlingService) {

        var api = '/login';

        function authorize(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
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
            var data = response.data;

            for (var i in data.role) {
                switch (data.role[i].title) {
                    case 'Viewer':
                        window.sessionStorage.setItem('user.role.viewer', true);
                        break;
                    case 'Voter':
                        window.sessionStorage.setItem('user.role.voter', true);
                        break;
                    case 'Facilitator':
                        window.sessionStorage.setItem('user.role.facilitator', true);
                        break;
                    case 'Administrator':
                        window.sessionStorage.setItem('user.role.administrator', true);
                        break;
                    default:
                        window.sessionStorage.clear();
                }
            }

            window.sessionStorage.setItem('userid', data.user._id);

            // HandlingService.ReturnSuccess();
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
            authorize: authorize
        };
    }
}());