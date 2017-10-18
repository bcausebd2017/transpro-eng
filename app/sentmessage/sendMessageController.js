(function () {
    'use strict';
    angular.module("app").controller("SendMessageController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, MessageService, alertMsg) {
        $scope.sendmessage = null;
        Activate();
        function Activate() {
           
            MessageService.getSendMsgById($scope.CurrentUser.ID).then(function (response) {
                $scope.sendmessage = response;
            }).catch(function (error) {
                $scope.sendmessage = [];
                alertMsg.show('error', error);
            });
        }


    });

})();