(function () {
    'use strict';
    angular.module("app").controller("SendMessageReadController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, MessageService, alertMsg, ORDER_STATUS, PAYMENT_STATUS) {
        //$scope.orderTranslated = null;
        //$scope.OrderStatus = ORDER_STATUS;
        //$scope.UserType = USER_TYPE;
        //$scope.PaymentStatus = PAYMENT_STATUS;
        //$scope.value = [];
        $scope.value = null;
        var vm = this;
        
        Activate();
        function Activate() {
            
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            var msgId = $state.params.msgId;

            MessageService.getsendMsgDetailsbyId(msgId).then(function (response) {
                $scope.value = response[0];
            }).catch(function (error) {
                $scope.value = [];
                alertMsg.show('error', error);
            });

          

        }

    });

})();