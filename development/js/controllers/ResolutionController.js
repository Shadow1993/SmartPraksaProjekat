(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionController', ['$scope',
        '$interval',
        'ResolutionService',
        'CommentService',
        'AuthorizeService',
        'VoteService',
        '$stateParams',
        ResolutionController]);

    function ResolutionController($scope, $interval, ResolutionService, CommentService,
                                    AuthorizeService, VoteService, $stateParams) {
        var vm = this;
        vm.test = 'test';
        vm.voterComment = '';
        vm.commentAny = '';
        $scope.decisionId = '';

        console.log(AuthorizeService.getUser());

        ResolutionService.getResolution($stateParams.id)
            .then(function (res) {
                console.log($stateParams.id);
                $scope.decisionId = $stateParams.id;
                vm.resoultionInfo = res;
                console.log(res);
            });

        /*CommentService.getComments($stateParams.id)
            .then( function(res){
                console.log(res);
            });*/
        /*============================
            Countdown for decisions
        ==============================*/
        $scope.myDate = ResolutionService.getResolution($stateParams.id).then(
            function (response) {
                response = vm.resoultionInfo.decision.expirationDate;
                return response;
            }
        ).then(
            function (response) {
                console.log(response);
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
            });

        /*=============================
                Vote Form
        ===============================*/
        vm.newVote = {
            type: null,
            submitedDate: Date.now(),
            submitedBy: null,
            commentText: '',
            id: null
        };

        vm.voteSubmit = function () {
            console.log($scope.myVote + ', ' + vm.voterComment);
            console.log('Id: ' + $scope.decisionId);

            vm.newVote.type = $scope.myVote;
            vm.newVote.submitedBy = '593a43ccdd987208fc8126c7';
            vm.newVote.commentText = vm.voterComment;
            vm.newVote.id = $scope.decisionId;

            console.log(vm.newVote);

            VoteService.createVote(vm.newVote)
                .then(function (res) {
                    console.log(res);
                }).catch(function (res) {
                    throw res;
                });
        };

        /*=============================
            New Comment Form
        ===============================*/
        vm.newCommentAny = {
            id: null,
            text: '',
            submitedBy: '',
            submitedDate: Date.now()
        };

        vm.commentSubmit = function() {
            console.log('Sending comment...');
            vm.newCommentAny.id = '123';
            vm.newCommentAny.text = vm.commentAny;
            vm.newCommentAny.submitedBy = 'Neko';

            console.log(vm.newCommentAny);

           /* CommentService.createComment(vm.newCommentAny)
                .then(function(res) {
                    console.log(res);
                }).catch(function (res) {
                    throw res;
                });*/
        };
    }

    /*=============================
           Directive
    ===============================*/
    app.directive('minimumWordsValidation', function () {
        ' use strict';
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                // Figure out name of count variable we will set on parent scope
                var wordCountName = attrs.ngModel.replace('.', '_') + '_words_count';

                scope.$watch(function () {
                    return ngModelCtrl.$modelValue;
                },
                    function (newValue) {
                        var str = newValue && newValue.replace('\n', '');
                        // Dont split when string is empty, else count becomes 1
                        var wordCount = str ? str.split(' ').length : 0;
                        // Set count variable
                        scope.$parent[wordCountName] = wordCount;
                        // Update validity
                        var min = attrs.minimumWordsValidation;
                        ngModelCtrl.$setValidity('minimumWords', wordCount >= min);
                    });
            }
        };
    });

}());