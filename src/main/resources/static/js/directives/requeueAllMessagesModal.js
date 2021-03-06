angular.module('rmqmgmt').directive('requeueAllMessagesModal', function() {
    return {
        replace : false,
        restrict : 'A',
        templateUrl : '/partials/directives/requeueAllMessagesModal.tpl.html',
        scope : {
            vhost : '=vhost',
            queue : '=queue',
            message : '=message',
            successCallback : '=successCallback'
        },
        link : function(scope, element, attr) {
            scope.modalElement = $(element).find(".modal");
        },
        controller : [ '$scope', '$http', 'modalRestExecutor', function($scope, $http, modalRestExecutor) {
            $scope.isMessageStateValid = function(){
                return $scope.message !== undefined && $scope.message.requeueAllowed === true && $scope.message.requeueExchange === undefined && $scope.message.requeueRoutingKey === undefined;
            };

            $scope.requeue = function($event) {
                if (!($($event.currentTarget).hasClass('disabled'))){
                    var url = '/api/messages/requeue?vhost=' + window.encodeURIComponent($scope.vhost) +
                                '&queue=' + window.encodeURIComponent($scope.queue);
                    modalRestExecutor('POST', url, $scope);
                }
            };

        } ]
    };
});