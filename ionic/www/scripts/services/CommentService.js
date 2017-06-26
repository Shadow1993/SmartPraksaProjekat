(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('CommentService', ['$http', 'HandlingService', CommentService]);
    function CommentService($http, HandlingService) {
        var api = '/comments';

        //Get Comments for a Decision
        function getComments(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }

        //Create a new Comment
        function createComment(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        return {
            getComments: getComments,
            createComment: createComment
        };
    }
}());