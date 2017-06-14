(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionController', ['$scope',
        '$interval',
        'ResolutionService',
        '$stateParams',
        ResolutionController]);

    function ResolutionController($scope, $interval, ResolutionService, $stateParams) {
        var vm = this;
        vm.test = 'test';

        ResolutionService.getResolution($stateParams.id)
            .then(function (res) {
                console.log($stateParams.id);
                vm.resoultionInfo = res;
            });

        /*============================
            Countdown for decisions
        ==============================*/
        $scope.myDate = ResolutionService.getResolution($stateParams.id).then(
            function (response) {
                response = vm.resoultionInfo.expirationDate;
            }
        ).then(
            function (response) {
                $scope.eventDay = {
                    date: new Date(response)
                };
                $scope.timeTillEvent = {};

                $scope.updateClock = function () {
                    $scope.newDate = new Date();
                    $scope.seconds = ($scope.eventDay.date - new Date()) / 1000;
                    $scope.timeTillEvent = {
                        daysLeft: parseInt($scope.seconds / 86400),
                        hoursLeft: parseInt($scope.seconds % 86400 / 3600),
                        minutesLeft: parseInt($scope.seconds % 86400 % 3600 / 60),
                        secondsLeft: parseInt($scope.seconds % 86400 % 3600 % 60)
                    };
                };

                setInterval(function () {
                    $scope.$apply($scope.updateClock);
                }, 1000);
                $scope.updateClock();
                if ($scope.timeTillEvent.daysLeft <= 0 &&
                    $scope.timeTillEvent.hoursLeft &&
                    $scope.timeTillEvent.minutesLeft &&
                    $scope.timeTillEvent.secondsLeft) {
                }
            });

        /*=============================
            Vote Form
        ===============================*/
        vm.voteSubmit = function () {
            $scope.voteFor = $scope.myVote;
            console.log($scope.myVote + $scope.voterComment);
        };
    }
}());