(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('UserService', ['$http', '$q', UserService]);

    function UserService($http, $q) {

        var api = '/users';

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            editUser: editUser,
            deleteUser: deleteUser
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
                url: api
            })
                .then(ReturnData)
                .catch(ReturnError);
        }
        function getUser(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(ReturnData)
                .catch(ReturnError);
        }
        function createUser(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(ReturnSuccess)
                .catch(ReturnError);
        }
        function editUser(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(ReturnSuccess)
                .catch(ReturnError);
        }
        function deleteUser(id) {
            return $http({
                method: 'DELETE',
                url: api + '/' + id
            })
                .then(ReturnSuccess)
                .catch(ReturnError);
        }
    }
}());