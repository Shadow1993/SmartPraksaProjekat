(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('TestService', ['$http', 'HandlingService', TestService]);

    function TestService($http, HandlingService) {

        var api = {
            users: '/users',
            decisions: '/decisions'
        };

        function getUsers() {
            return $http({
                method: 'GET',
                url: api.users
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function getUser(id) {
            return $http({
                method: 'GET',
                url: api.users + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function createUser(data) {
            return $http({
                method: 'POST',
                url: api.users,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function editUser(data) {
            return $http({
                method: 'PUT',
                url: api.users,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function deleteUser(id) {
            return $http({
                method: 'DELETE',
                url: api.users + '/' + id
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        function getResolutions() {
            return $http({
                method: 'GET',
                url: api.decisions
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function getResolution(id) {
            return $http({
                method: 'GET',
                url: api.decisions + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function createResolution(data) {
            return $http({
                method: 'POST',
                url: api.decisions,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function editResolution(data) {
            return $http({
                method: 'PUT',
                url: api.decisions,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function deleteResolution(id) {
            return $http({
                method: 'DELETE',
                url: api.decisions + '/' + id
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        function populate(what) {
            var someData = {
                users: [
                    {
                        username: 'Ana',
                        password: 'Contributovic',
                        role: ['Viewer'],
                        dateCreated: Date.now()
                    },
                    {
                        username: 'Aleksandar',
                        password: 'CEOvic',
                        role: ['Viewer', 'Voter'],
                        dateCreated: Date.now()
                    },
                    {
                        username: 'Marija',
                        password: 'Marketin',
                        role: ['Viewer', 'Facilitator'],
                        dateCreated: Date.now()
                    },
                    {
                        username: 'Sandra',
                        password: 'Sale Serifovic',
                        role: ['Viewer, Voter', 'Facilitator'],
                        dateCreated: Date.now()
                    },
                    {
                        username: 'Sanja',
                        password: 'HRtkovic',
                        role: ['Viewer', 'Facilitator', 'Voter'],
                        dateCreated: Date.now()
                    },
                    {
                        username: 'Nikola',
                        password: 'Systemadministratoric',
                        role: ['Viewer', 'Administrator'],
                        dateCreated: Date.now()
                    }
                ],
                decisions: [
                    {
                        title: 'Main',
                        description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        type: ['Simple Majority'],
                        startingDate: Date.now(),
                        expirationDate: Date.now() + 10000000
                    },
                    {
                        title: 'asdf',
                        description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        type: ['Simple Majority'],
                        startingDate: Date.now(),
                        expirationDate: Date.now() + 10000000
                    },
                    {
                        title: 'Magasdagin',
                        description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        type: ['Simple Majority'],
                        startingDate: Date.now(),
                        expirationDate: Date.now() + 10000000
                    },
                    {
                        title: 'Masadgain',
                        description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        type: ['Simple Majority'],
                        startingDate: Date.now(),
                        expirationDate: Date.now() + 10000000
                    },
                    {
                        title: 'Masadfin',
                        description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        type: ['Simple Majority'],
                        startingDate: Date.now(),
                        expirationDate: Date.now() + 10000000
                    },
                    {
                        title: 'wefasdf',
                        description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        type: ['Simple Majority'],
                        startingDate: Date.now(),
                        expirationDate: Date.now() + 10000000
                    }
                ],
                role: [
                    {
                        title: 'Viewer',
                        description: 'Gledim'
                    },
                    {
                        title: 'Voter',
                        description: 'Glasim'
                    },
                    {
                        title: 'Facilitator',
                        description: 'Pravim'
                    },
                    {
                        title: 'Administrator',
                        description: 'Admin'
                    }
                ]
            };

            if (what === 'users') {
                for (var i in someData.users) {
                    createUser(someData.users[i]);
                }
            } else if (what === 'decisions') {
                for (var j in someData.decisions) {
                    createResolution(someData.decisions[j]);
                }
            } else {
                return 'You can only populate, "users" or "decisions"';
            }
        }

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            editUser: editUser,
            deleteUser: deleteUser,
            getResolutions: getResolutions,
            getResolution: getResolution,
            createResolution: createResolution,
            editResolution: editResolution,
            deleteResolution: deleteResolution,
            populate: populate
        };
    }
}());