(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', ['$state', 'UserService', '$uibModal', AdminController]);

    function AdminController($state, UserService, $uibModal) {
        var vm = this;
        vm.test = 'test';

        vm.addUser = function () {
            vm.modalAddUser = $uibModal.open({
                templateUrl: '../templates/adminuser.html',
                controller: 'AdminUserController',
                controllerAs: 'admin',
                resolve: {
                    user: function() {
                        return false;
                    }
                }
            })
                .result
                .then(function () {
                    $state.reload();
                })
                .catch(function (res) {
                    if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                        throw res;
                    }
                });
        };

        vm.editUser = function (user) {
            vm.modalEditUser = $uibModal.open({
                templateUrl: '../templates/adminuser.html',
                controller: 'AdminUserController',
                controllerAs: 'admin',
                resolve: {
                    user: function() {
                        return user;
                    }
                }
            })
                .result
                .then(function () {
                    $state.reload();
                })
                .catch(function (res) {
                    if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                        throw res;
                    }
                });

        };

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
    }
}());