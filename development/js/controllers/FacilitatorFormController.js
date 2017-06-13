(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorFormController', ['$scope',
        'ResolutionService',
        '$rootScope',
        '$uibModalInstance',
        FacilitatorFormController]);

    function FacilitatorFormController($scope, ResolutionService, $rootScope, $uibModalInstance) {

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 7 || date.getDay() === 7);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        // Change numeric month to word

        var text;

        $scope.something = function (monthWord) {
            switch (monthWord) {
                case 0:
                    return 'January';
                case 1:
                    return 'February';
                case 2:
                    return 'March';
                case 3:
                    return 'April';
                case 4:
                    return 'May';
                case 5:
                    return 'June';
                case 6:
                    return 'July';
                case 7:
                    return 'August';
                case 8:
                    return 'September';
                case 9:
                    return 'October';
                case 10:
                    return 'November';
                case 11:
                    return 'December';
                default:
                    text = 'You made a mistake, yo!';
            }
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
        $scope.options = [
            'Simple Majority',
            'Super Majority',
            'Unanimous'
        ];
        $scope.datePick = '';
        $scope.decisionData = {
            title: '',
            description: '',
            startingDate: Date.now(),
            expirationDate: $scope.dt
        };
        $scope.toastrSubmit = function (working) {
            if (working) {
                toastr.success('Form is valid! Kudos to You Sir/Madam!');
                console.log($scope.decisionData);
                ResolutionService.createResolution($scope.decisionData);
            } else {
                toastr.error('Drats! You did not fill in the form data correctly.');
            }
        };

        // Make decision

        $scope.makeDecision = function () {
            ResolutionService.createResolution($scope.decisionData);
            console.log();
        };

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $rootScope.$on('$stateChangeStart',
            function () {
                $scope.closeModal();
            });

    }
}());