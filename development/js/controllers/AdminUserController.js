(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminUserController', ['UserService',
                                            '$uibModalInstance',
                                            '$rootScope',
                                            'user',
                                            AdminUserController
                                            ]);

    function AdminUserController(UserService, $uibModalInstance, $rootScope, user) {
        var vm = this;
        vm.test = 'test';

        $rootScope.$on('$stateChangeStart',
            function () {
                vm.cancelModal();
            });

        vm.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
        vm.newUser = {
            username: null,
            password: null,
            role: ['Viewer'],
            dateCreated: null
        };
        vm.permissions = {
            facilitator: null,
            voter: null
        };

        if (!user) {
            vm.submitText = 'Create User';
            vm.submit = function (valid) {
                if (valid) {
                    if (vm.permissions.facilitator) {
                        vm.newUser.role.push('Facilitator');
                    }
                    if (vm.permissions.voter) {
                        vm.newUser.role.push('Voter');
                    }
                    vm.newUser.dateCreated = Date.now();
                    UserService.createUser(vm.newUser);
                    $uibModalInstance.close('completed');
                } else {
                    toastr.error('Please check the errors on the form and resubmit it again.');
                }
            };
        } else if (Boolean(user)) {
            vm.submitText = 'Edit User';
            vm.newUser = {
                id: user._id,
                username: user.username,
                password: user.password,
                role: ['Viewer'],
                dateCreated: user.dateCreated
            };
            vm.submit = function (valid) {
                if (valid) {
                    if (vm.permissions.facilitator) {
                        vm.newUser.role.push('Facilitator');
                    }
                    if (vm.permissions.voter) {
                        vm.newUser.role.push('Voter');
                    }
                    UserService.editUser(vm.newUser);
                    $uibModalInstance.close('completed');
                } else {
                    toastr.error('Please check the errors on the form and resubmit it again.');
                }
            };
        }

    }
}());