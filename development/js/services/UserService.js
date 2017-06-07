(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('UserService', ['$http', '$q', UserService]);

    function UserService($http, $q) {
        return {
            getUsers: getUsers,
            createUser: createUser,
            editUser: editUser
        };

        function ReturnError(response) {
            return $q.reject('Error: ' + response.status + '; Response: ' + response.data.message);
        }
        function ReturnData(response) {
            return response.data;
        }
        function ReturnSuccess() {
            return $q.resolve();
        }

        function getUsers() {
            return $http({
                method: 'GET',
                url: '/users'
            })
                .then(ReturnData)
                .catch(ReturnError);
        }
        function createUser(data) {
            return $http({
                method: 'POST',
                url: '/users',
                data: data
            })
                .then(ReturnSuccess)
                .catch(ReturnError);
        }
        function editUser(data) {
            return $http({
                method: 'PUT',
                url: '/users',
                data: data
            })
                .then(ReturnSuccess)
                .catch(ReturnError);
        }
    }
}());