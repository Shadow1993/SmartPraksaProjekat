(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionController', ['$scope', '$interval','ResolutionService', '$stateParams', ResolutionController]);

    function ResolutionController($scope, $interval, ResolutionService, $stateParams) {
        var vm = this;
        vm.test = 'test';

        ResolutionService.getResolution($stateParams.id)
            .then(function (res) {
                console.log($stateParams.id);
                vm.resoultionInfo = res;
                return res;
            });

       

        /*============================
            Countdown for decisions
        ==============================*/ 
        $scope.nesto = '';
        $scope.myDate = ResolutionService.getResolution($stateParams.id).then(
            function(response) {
                response = vm.resoultionInfo.expirationDate;
                return response;
            }
       ).then(
           function(response){
               //console.log("Drugi response: " + response);
                $scope.eventDay = {
                    date: new Date(response),
                    //date: new Date("2017-06-13T06:37:07.758Z"),
                    eventDetails: "Mr. Olympia 2014 – Las Vegas, Nevada"
                }
                $scope.timeTillEvent = {};

                $scope.updateClock = function () {
                    $scope.newDate = new Date();
                    $scope.seconds = ($scope.eventDay.date - new Date() ) / 1000;
                    $scope.timeTillEvent = {
                        daysLeft: parseInt($scope.seconds / 86400),
                        hoursLeft: parseInt($scope.seconds % 86400 / 3600),
                        minutesLeft: parseInt($scope.seconds % 86400 % 3600 / 60),
                        secondsLeft: parseInt($scope.seconds % 86400 % 3600 % 60)
                    }
                };

                setInterval(function () {
                    $scope.$apply($scope.updateClock);
                }, 1000);
                $scope.updateClock();
           }
       );



       console.log('Test ' + $scope.nesto);

        /*$scope.eventDay = {
            date: new Date("2017-06-17T06:37:07.758Z"),
           //date: new Date("2017-06-13T06:37:07.758Z"),
            eventDetails: "Mr. Olympia 2014 – Las Vegas, Nevada"
        }
        $scope.timeTillEvent = {};

        $scope.updateClock = function () {
            $scope.newDate = new Date();
            $scope.seconds = ($scope.eventDay.date - new Date() ) / 1000;
            $scope.timeTillEvent = {
                daysLeft: parseInt($scope.seconds / 86400),
                hoursLeft: parseInt($scope.seconds % 86400 / 3600),
                minutesLeft: parseInt($scope.seconds % 86400 % 3600 / 60),
                secondsLeft: parseInt($scope.seconds % 86400 % 3600 % 60)
            }
        };

        setInterval(function () {
            $scope.$apply($scope.updateClock);
        }, 1000);
        $scope.updateClock();*/
        
        
    

    }
}());