(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', ['$state', 'UserService', '$uibModal', AdminController]);

    function AdminController($state, UserService, $uibModal) {
        var vm = this;
        vm.test = 'test';

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

        //Converting Date to display as needed
        vm.convertDate = function (date) {
            var convertedDate = new Date(date);
            return convertedDate.toUTCString();
        };

        function SuccessCall(res) {
            vm.userInfo = res;
        }
        function ErrorCall(res) {
            console.error(res);
            toastr.error(res);
        }
        vm.deleteUser = function (user) {
            UserService.deleteUser(user);
            $state.reload();
        };
        UserService.getUsers()
            .then(SuccessCall)
            .catch(ErrorCall);

        vm.pagination = {
            currentPage: 1,

            setPage: function (pageNo) {
                vm.pagination.currentPage = pageNo;
            },
            maxSize: 5
        };

    }
}());