(function () {
    'use strict';
    angular.module("app").controller("mypageTranslatorController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE,ORDER_STATUS, appStorageFactory, transproService, alertMsg) {
        $scope.orders = null;
        $scope.orderTranslated = null;
        $scope.orderAppointed = null;
        $scope.OrderStatus = ORDER_STATUS;
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            getOrderBreakDown();
            getOrderTobeTranslated()
            getAppointedOrders();
        }
        function getOrderBreakDown() {
            var clientId = $scope.CurrentUser.UserType == USER_TYPE.Customer ? $scope.CurrentUser.ID : null;
            var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, translatorId: translatorId }
            transproService.getWebOrders(filterModel).then(function (response) {
                $scope.orders = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        function getOrderTobeTranslated() {
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, orderStatus: ORDER_STATUS.WaitingForConfirmation, trgLangId: $scope.CurrentUser.NativeLanguageID }
            transproService.getWebOrders(filterModel).then(function (response) {
                $scope.orderTranslated = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        function getAppointedOrders() {
            var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, translatorId: translatorId }
            transproService.getAppointedOrders(filterModel).then(function (response) {
                $scope.orderAppointed = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
    });

})();