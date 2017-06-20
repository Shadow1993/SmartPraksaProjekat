(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionController', ['$scope',
        '$interval',
        'ResolutionService',
        'CommentService',
        'AuthorizeService',
        'VoteService',
        'UserService',
        '$stateParams',
        '$state',
        '$location',
        '$window',
        ResolutionController]);

    function ResolutionController($scope, $interval, ResolutionService, CommentService,
                                    AuthorizeService, VoteService, UserService,
                                    $stateParams, $state, $location, $window) {
        var vm = this;
        vm.test = 'test';
        vm.voterComment = '';
        vm.commentAny = '';
        $scope.decisionId = '';
        $scope.userId = AuthorizeService.getUser();
        $scope.userName = '';
        $scope.decisionComments = '';
        $scope.countedForPercent = null;
        $scope.countedAgainstPercent = null;
        $scope.countedReservedPercent = null;
        $scope.countAllVotes = null;

        ResolutionService.getResolution($stateParams.id)
            .then(function (res) {
                $scope.decisionId = $stateParams.id;
                vm.resoultionInfo = res;
                return res;
            })
            .then(
                function(res) {
                    $scope.countedFor       = res.countedVotes.agreed;
                    $scope.countedAgainst   = res.countedVotes.against;
                    $scope.countedReserved  = res.countedVotes.reserved;

                    $scope.countAllVotes = $scope.countedFor + $scope.countedAgainst + $scope.countedReserved;

                    $scope.countedForPercent        = $scope.countedFor / $scope.countAllVotes * 100;
                    $scope.countedAgainstPercent    = $scope.countedAgainst / $scope.countAllVotes * 100;
                    $scope.countedReservedPercent   = $scope.countedReserved / $scope.countAllVotes * 100;
                }
            );

        /*=================================
            Get All Comments for Decision
        ===================================*/
        function asdf(n) {
            console.log(n);
            $scope.fromUser = n;
        }
        CommentService.getComments($stateParams.id)
            .then(function(res) {
                $scope.decisionComments = res;
                for (var x = 0; x < res.length; x++) {
                    UserService.getUser(res[x].submitedBy)
                        .then(
                            asdf
                        );
                }
            });

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
            //if ($window.confirm('Do you want to leave vote?')) {
            vm.newVote.type         = $scope.myVote;
            vm.newVote.submitedBy   = $scope.userId.id;
            vm.newVote.commentText  = vm.voterComment;
            vm.newVote.id           = $scope.decisionId;

            VoteService.createVote(vm.newVote)
                .then(function (res) {
                    console.log(res);
                    $location.path('/resolutions');
                }).catch(function (res) {
                    throw res;
                });
            //}
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
            if ($window.confirm('Do you want to leave comment?')) {
                console.log('Sending comment...');
                vm.newCommentAny.id = $stateParams.id;
                vm.newCommentAny.text = vm.commentAny;
                vm.newCommentAny.submitedBy = $scope.userId.id;

                console.log(vm.newCommentAny);

                CommentService.createComment(vm.newCommentAny)
                    .then(function(res) {
                        console.log(res);
                        $location.path('/resolutions');
                    }).catch(function (res) {
                        throw res;
                    });
            }
        };

        /*=======================
            Pagination
        =========================*/
        $scope.commentsViewBy             = 5;
        $scope.currentCommentsPageActive  = 6;
        $scope.commentItemsPerPage        = $scope.commentsViewBy;
        $scope.decisionMaxSize            = 5; //Number of pager buttons to show

        $scope.setPage = function (commentsPageNo) {
            $scope.currentCommentsPageActive = commentsPageNo;
        };

        $scope.commentsPageChanged = function() {
            console.log('Page changed to: ' + $scope.currentCommentsPageActive);
        };

        $scope.setCommentItemsPerPage = function(num) {
            $scope.commentItemsPerPage = num;
            $scope.currentCommentsPageActive = 1; //reset to first page
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