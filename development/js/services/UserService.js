(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('UserService', ['$http', 'HandlingService', UserService]);

    function UserService($http, HandlingService) {

        var api = '/users';

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            editUser: editUser,
            deleteUser: deleteUser
        };

        function getUsers() {
            return $http({
                method: 'GET',
                url: api
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function getUser(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function createUser(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function editUser(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function deleteUser(id) {
            return $http({
                method: 'DELETE',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
    }
}());