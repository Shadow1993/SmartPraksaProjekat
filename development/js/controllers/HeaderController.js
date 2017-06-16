(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HeaderController', ['AuthorizeService', HeaderController]);

    function HeaderController(AuthorizeService) {
        var vm = this;
        vm.test = 'test';
        vm.myRole = '';

        AuthorizeService.checkAuthorization()
            .then(function () {
                vm.user = AuthorizeService.getUser();
                vm.permission = function (role) {
                    for (var i in vm.user.role) {
                        if (vm.user.role[i] === role) {
                            return true;
                        }
                    }
                    return false;
                };
                if (vm.user.role.includes('Viewer')) {
                    vm.myRole += ' Viewer';
                }
                if (vm.user.role.includes('Voter')) {
                    vm.myRole += ' Voter';
                }
                if (vm.user.role.includes('Facilitator')) {
                    vm.myRole += ' Facilitator';
                }
                if (vm.user.role.includes('Administrator')) {
                    vm.myRole += ' Administrator';
                }
            });
    }
}());