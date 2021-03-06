(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorFormController', ['ResolutionService',
        '$rootScope',
        '$uibModalInstance',
        '$scope',
        FacilitatorFormController]);
    function FacilitatorFormController(ResolutionService, $rootScope, $uibModalInstance, $scope) {

        var vm = this;

        //  <<Input object>>

        vm.decisionData = {
            title: '',
            description: '',
            startingDate: Date.now(),
            expirationDate: null,
            steps: ''
        };

        // <<Date-picker>>

        vm.today = function () {
            vm.decisionData.expirationDate = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.decisionData.expirationDate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // <<Enable weekend selection>>

        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 7 || date.getDay() === 7);
        }

        vm.open1 = function () {
            vm.popup1.opened = true;
        };

        vm.open2 = function () {
            vm.popup2.opened = true;
        };

        vm.setDate = function (year, month, day) {
            vm.decisionData.expirationDate = new Date(year, month, day);
        };

        vm.formats = ['dd.MM.yyyy hh:mm:ss', 'shortDate'];
        vm.format = vm.formats[0];
        vm.altInputFormats = ['M!/d!/yyyy/'];

        // <<Switch numeric month to word>>

        var text;

        vm.something = function (monthWord) {
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

        vm.popup1 = {
            opened: false
        };

        vm.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        vm.events = [
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

                for (var i = 0; i < vm.events.length; i++) {
                    var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        }

        // <<Timepicker>>

        vm.mytime = new Date();

        vm.hstep = 1;
        vm.mstep = 15;

        vm.ismeridian = true;
        vm.toggleMode = function () {
            vm.ismeridian = !vm.ismeridian;
        };

        vm.update = function () {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            vm.mytime = d;
        };

        vm.changed = function () {
            console.log('Time changed to: ' + vm.mytime);
        };

        vm.clear = function () {
            vm.mytime = null;
        };

        // <<Form submit>>

        vm.formSubmit = function (working) {
            if (working) {
                toastr.success('Form is valid! Kudos to You Sir/Madam!');
                if (vm.decisionData.type === 'Simple Majority') {
                    vm.decisionData.steps = '60';
                } else if (vm.decisionData.type === 'Super Majority') {

                } else if (vm.decisionData.type === 'Unanimous') {
                    vm.decisionData.steps = '90';
                }else {
                    return toastr.error('You did not choose your destiny. Choose wisely next time.');
                }
                console.log(vm.decisionData);
                console.log(vm.mytime);
                ResolutionService.createResolution(vm.decisionData)
                    .then(function () {
                        $uibModalInstance.close('complete');
                    })
                    .catch(function (res) {
                        throw res;
                    });
            } else {
                toastr.error('Drats! You did not fill in the form data correctly.');
            }
        };

        // <<Close Modal>>

        vm.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // <<Modal bug fix>>

        $rootScope.$on('$stateChangeStart',
            function () {
                vm.closeModal();
            });

        // <<Voting options>>

        vm.options = [
            'Simple Majority',
            'Super Majority',
            'Unanimous'
        ];

        vm.steps = ['60', '70', '80', '90'];

        vm.votingMajority = function () {
            if (vm.decisionData.type === 'Super Majority') {
                return true;
            } else {
                return false;
            }
        };

    }
}());