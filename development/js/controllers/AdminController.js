(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', ['UserService', AdminController]);

    function AdminController(UserService) {
        var vm = this;
        vm.test = 'test';
        UserService.getUsers().then(function(res) {
            console.log(res);
            vm.userInfo = res;
            
        });
    }
}());