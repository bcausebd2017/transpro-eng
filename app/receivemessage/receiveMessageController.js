(function () {
    'use strict';
    angular.module("app").controller("receiveMessageController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, MessageService, alertMsg) {
        $scope.receivemsg = null;
        Activate();
        function Activate() {
          
            MessageService.getReceiveMsgById($scope.CurrentUser.ID).then(function (response) {
                $scope.receivemsg = response;
            }).catch(function (error) {
                $scope.receivemsg = [];
                alertMsg.show('error', error);
            });
        }
    });

})();