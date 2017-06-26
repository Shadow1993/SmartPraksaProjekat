(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TestController', ['TestService', 'VoteService', 'CommentService', TestController]);

    function TestController(TestService, VoteService, CommentService) {
        var vm = this;
        vm.test = 'test';

        var testObj = {
            id: '59393ad6e2d5c820c81e6151',
            type: 'Against',
            submitedDate: Date.now(),
            submitedBy: '593e59bf4188d5280469d758',
            commentText: 'Testing 1234567890 asdfasdfasdfasdf asdfasdfasdfasdfas asdfasdfasdfasdf'
        };

        var testComment = {
            id: '59393ad6e2d5c820c81e6151',
            text: 'BLAAAAAAAAAAAAAAaHHHH',
            submitedBy: '593e59bf4188d5280469d758',
            submitedDate: Date.now()
        };

        function testFunc(res) {
            console.log('Response:');
            console.log(res);
        }

        vm.getComments = function() {
            CommentService.getComments('59393ad6e2d5c820c81e6151')
                .then(testFunc, testFunc);
        };

        vm.addComment = function() {
            CommentService.createComment(testComment)
                .then(testFunc, testFunc);
        };
        vm.addVote = function() {
            VoteService.createVote(testObj)
                .then(testFunc, testFunc);
        };

        vm.populateUsers = function () {
            TestService.populate('users');
        };
        vm.populateDecisions = function () {
            TestService.populate('decisions');
        };
    }
}());