(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorFormController', ['ResolutionService',
        '$rootScope',
        '$uibModalInstance',
        FacilitatorFormController]);

    function FacilitatorFormController(ResolutionService, $rootScope, $uibModalInstance) {

        var vm = this;

        vm.today = function () {
            vm.dt = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.dt = null;
        };

        vm.inlineOptions = {
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

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 7 || date.getDay() === 7);
        }

        vm.toggleMin = function () {
            vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
            vm.dateOptions.minDate = vm.inlineOptions.minDate;
        };

        vm.toggleMin();

        vm.open1 = function () {
            vm.popup1.opened = true;
        };

        vm.open2 = function () {
            vm.popup2.opened = true;
        };

        vm.setDate = function (year, month, day) {
            vm.dt = new Date(year, month, day);
        };

        vm.formats = ['dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.altInputFormats = ['M!/d!/yyyy'];

        // Change numeric month to word

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
        vm.options = [
            'Simple Majority',
            'Super Majority',
            'Unanimous'
        ];
        vm.datePick = '';
        vm.decisionData = {
            title: '',
            description: '',
            startingDate: Date.now(),
            expirationDate: vm.dt
        };
        vm.formSubmit = function (working) {
            if (working) {
                toastr.success('Form is valid! Kudos to You Sir/Madam!');
                ResolutionService.createResolution(vm.decisionData);
                $uibModalInstance.close('complete');
            } else {
                toastr.error('Drats! You did not fill in the form data correctly.');
            }
        };
        // Close Modal

        vm.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $rootScope.$on('$stateChangeStart',
            function () {
                vm.closeModal();
            });

    }
}());