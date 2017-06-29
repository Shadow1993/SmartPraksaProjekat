(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', ['$state', 'UserService', '$uibModal', '$scope', AdminController]);

    function AdminController($state, UserService, $uibModal, $scope) {
        var vm = this;
        vm.test = 'test';

        vm.userInfo = [];

        var params = {
            offset: 0,
            limit: 5
        };

        var spamprevent =  ['rip'];

        $scope.loadMore = function() {
            if (spamprevent.length === 0) {
                return $scope.$broadcast('scroll.infiniteScrollComplete');
            }
            params.offset = vm.userInfo.length;
            UserService.getUsers(params.offset, params.limit)
                .then(SuccessCall)
                .catch(ErrorCall);
        };

        function SuccessCall(res) {
            vm.userInfo = vm.userInfo.concat(res);
            spamprevent = res;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        function ErrorCall(res) {
            console.error(res);
            toastr.error(res);
        }

        function reloadState() {
            $state.reload();
        }

        function errorInModal(res) {
            //Ignore generic messages, and only throw out errors, not including specified ones
            if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                throw res;
            }
        }

        vm.addUser = function () {
            //Modal Window
            vm.modalAddUser = $uibModal.open({
                templateUrl: '../templates/adminuser.html',
                controller: 'AdminUserController',
                controllerAs: 'admin',
                resolve: {
                    user: function () {
                        return false;
                    }
                }
            })
                .result
                .then(reloadState)
                .catch(errorInModal);
        };

        vm.editUser = function (user) {
            //Modal Window
            vm.modalEditUser = $uibModal.open({
                templateUrl: '../templates/adminuser.html',
                controller: 'AdminUserController',
                controllerAs: 'admin',
                resolve: {
                    user: function () {
                        return user;
                    },
                    role: function ($q) {
                        for (var i in user.role) {
                            if (user.role[i].title === 'Administrator') {
                                toastr.error('You cannot change an administrator role');
                                return $q.reject('unauthorized');
                            }
                        }
                        return;
                    }
                }
            })
                .result
                .then(reloadState)
                .catch(errorInModal);

        };

        vm.sortOptions = [' ','+username', '-username', '+dateCreated', '-dateCreated'];

        //Converting Date to display as needed
        vm.convertDate = function (date) {
            var convertedDate = new Date(date);
            return convertedDate.toUTCString();
        };

        vm.deleteUser = function (user) {
            UserService.deleteUser(user);
            $state.reload();
        };

        vm.pagination = {
            currentPage: 1,

            setPage: function (pageNo) {
                vm.pagination.currentPage = pageNo;
            },
            maxSize: 5
        };

    }
}());