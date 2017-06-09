(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', ['$state' , 'UserService', AdminController]);

    function AdminController($state, UserService) {
        var vm = this;
        vm.test = 'test';

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
        vm.submit = function(valid) {
            if (valid) {
                if (vm.permissions.facilitator) {
                    vm.newUser.role.push('Facilitator');
                }
                if (vm.permissions.voter) {
                    vm.newUser.role.push('Voter');
                }
                vm.newUser.dateCreated = Date.now();
                console.log(vm.newUser);
                UserService.createUser(vm.newUser);
                $state.reload();
            } else {
                toastr.error('Please check the errors on the form and resubmit it again.');
            }
        };
        UserService.getUsers()
            .then(SuccessCall)
            .catch(ErrorCall);
    }
}());