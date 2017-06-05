(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', ['DataService', AdminController]);

    function AdminController(DataService) {
        var vm = this;
        vm.test = 'test';

        vm.user = {
            name: '',
            password: ''
        };

        function DataS(response) {
            console.log(response);
        }
        DataService.getTest()
            .then(DataS, DataS);
    }
}());