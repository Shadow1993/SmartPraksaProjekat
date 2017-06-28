(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FooterController', ['$ionicScrollDelegate', FooterController]);

    function FooterController($ionicScrollDelegate) {
        var vm = this;

        vm.scrollTop = function () {
            $ionicScrollDelegate.scrollTop(2000);
        };
    }

//     // Show or hide scrolling arrow
//     app.directive('scrollWatch', function($rootScope, $ionicScrollDelegate) {
//         return function(scope, elem) {
//             var start = 0;
//             var threshold = 250;
//             elem.bind('scroll', function() {
//                 if ($ionicScrollDelegate.getScrollPosition().top - start > threshold) {
//                     $rootScope.slideHeader = true;
//                     console.log($rootScope.slideHeader);
//                 } else {
//                     $rootScope.slideHeader = false;
//                     console.log($rootScope.slideHeader);
//                 }
//                 $rootScope.$apply();
//             });
//         };
//     });
// }());