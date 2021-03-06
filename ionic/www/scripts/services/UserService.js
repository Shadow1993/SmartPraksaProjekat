(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('UserService', ['$http', 'HandlingService', UserService]);

    function UserService($http, HandlingService) {

        var api = '/users';

        //Get all Users
        function getUsers(offset, limit) {
            if (offset === undefined || limit === undefined) {
                offset = 0;
                limit = 0;
            }
            return $http({
                method: 'GET',
                url: api,
                params: {
                    offset: offset,
                    limit: limit
                }
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }

        //Get a specific User
        function getUser(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }

        //Create a new User
        function createUser(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        //Edit an existing User
        function editUser(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        //Delete an Existing user (Server sided, just deactivates)
        function deleteUser(id) {
            return $http({
                method: 'DELETE',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            editUser: editUser,
            deleteUser: deleteUser
        };
    }
}());