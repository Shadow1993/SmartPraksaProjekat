(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('HandlingService', ['$q', HandlingService]);
    function HandlingService($q) {

        function ReturnError(response) {
            return $q.reject('Error: ' + response.status + '; Response: ' + response.data.message);
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