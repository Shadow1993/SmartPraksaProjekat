(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('CommentService', ['$http', 'HandlingService', CommentService]);
    function CommentService($http, HandlingService) {
        var api = '/comments';

        //Get Comments for a Decision
        function getComments(id, offset, limit) {
            if (offset === undefined || limit === undefined) {
                offset = 0;
                limit = 0;
            }
            return $http({
                method: 'GET',
                url: api + '/' + id,
                params: {
                    offset: offset,
                    limit: limit
                }
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