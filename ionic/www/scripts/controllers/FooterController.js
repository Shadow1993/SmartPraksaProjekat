(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FooterController', ['$ionicScrollDelegate',
                                        '$rootScope',
                                        FooterController]);

    function FooterController($ionicScrollDelegate, $rootScope) {
        var vm = this;

        vm.scrollTop = function () {
            $ionicScrollDelegate.scrollTop(2000);
        };
        $rootScope.$on('$stateChangeSuccess', function() {
            console.log('test');
        });
    }

    // Show or hide scrolling arrow
    /*app.directive('scrollWatch', function($rootScope, $ionicScrollDelegate) {
        return function(scope, elem) {
            var start = 0;
            var threshold = 250;
            elem.bind('scroll', function() {
                $rootScope.scrollC = $ionicScrollDelegate.getScrollPosition().top;
                if ($rootScope.scrollC - start > threshold) {
                    $rootScope.slideHeader = true;
                    console.log($rootScope.slideHeader);
                } else {
                    $rootScope.slideHeader = false;
                    console.log($rootScope.slideHeader);
                }
                $rootScope.$apply();
            });
        };
    });*/
}());