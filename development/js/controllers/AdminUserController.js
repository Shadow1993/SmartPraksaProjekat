(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminUserController', [
        'UserService',
        '$uibModalInstance',
        '$rootScope',
        'NotificationService',
        'user',
        AdminUserController
    ]);

    function AdminUserController(
        UserService,
        $uibModalInstance,
        $rootScope,
        NotificationService,
        user
    ) {
        var vm = this;

        //Fixes a bug when navigating while modal is open, simply closes it instead of leaving it open
        $rootScope.$on('$stateChangeStart',
            function () {
                vm.cancelModal();
            });

        vm.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //User object
        vm.newUser = {
            username: null,
            password: null,
            role: ['Viewer']
        };
        //Permissions from form for user
        vm.permissions = {
            facilitator: null,
            voter: null
        };

        //Fill in checkboxes for roles if any
        for (var i in user.role) {
            if (user.role[i].title === 'Voter') {
                vm.permissions.voter = true;
            }
            if (user.role[i].title === 'Facilitator') {
                vm.permissions.facilitator = true;
            }
        }

        function checkRolesAndApply() {
            //If any role is assigned, remove the viewer role (reset roles)
            if (vm.permissions.facilitator || vm.permissions.voter) {
                vm.newUser.role = [];
            }
            //Apply facilitator role
            if (vm.permissions.facilitator) {
                vm.newUser.role.push('Facilitator');
            }
            //Apply voter role
            if (vm.permissions.voter) {
                vm.newUser.role.push('Voter');
            }
        }

        function modalCompleted() {
            $uibModalInstance.close('completed');
        }

        function reportFormError() {
            toastr.error(NotificationService.validation.empty);
        }

        function throwError(res) {
            throw res;
        }

        //If the user object is not passed into modal
        if (!user) {
            vm.submitText = 'Create User';
            vm.submit = function (valid) {
                if (valid) {
                    checkRolesAndApply();
                    UserService.createUser(vm.newUser)
                        .then(modalCompleted)
                        .catch(throwError);
                } else {
                    reportFormError();
                }
            };
            //If the user object is passed into modal
        } else if (Boolean(user)) {
            vm.submitText = 'Edit User';
            //Populate form with values from
            vm.newUser = {
                id: user._id,
                username: user.username,
                password: '',
                dateCreated: user.dateCreated
            };
            vm.submit = function (valid) {
                if (valid) {
                    checkRolesAndApply();
                    UserService.editUser(vm.newUser)
                        .then(modalCompleted)
                        .catch(throwError);
                } else {
                    reportFormError();
                }
            };
        }

    }
}());