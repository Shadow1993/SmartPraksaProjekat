(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('HandlingService', ['$q', HandlingService]);
    function HandlingService($q) {

        function ReturnError(response) {
            return $q.reject('Status: ' + response.status + '; Response: ' + response.data);
        }
        function ReturnData(response) {
            return response.data;
        }
        function ReturnSuccess() {
            return $q.resolve('Success');
        }

        return {
            ReturnError: ReturnError,
            ReturnData: ReturnData,
            ReturnSuccess: ReturnSuccess
        };
    }
}());