(function () {
    'use strict';
    angular.module("app").controller("listOfOrderController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, alertMsg, ORDER_STATUS) {
        $scope.orderTranslated = null;
        $scope.OrderStatus = ORDER_STATUS;
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            getOrderTobeTranslated();
        }
  
        function getOrderTobeTranslated() {
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, orderStatus: ORDER_STATUS.WaitingForConfirmation, trgLangId: $scope.CurrentUser.NativeLanguageID }
            transproService.getWebOrders(filterModel).then(function (response) {
                $scope.orderTranslated = response;
            }).catch(function (error) {
                $scope.orderTranslated = [];
                alertMsg.show('error', error);
            });
        }
     
    });

})();