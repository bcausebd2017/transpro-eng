(function () {
    'use strict';
    angular.module("app").controller("translationFeeController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, alertMsg, ORDER_STATUS) {
        $scope.orderCompleted = null;
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            getCurrentMonthOrders();
        }

        function getCurrentMonthOrders() {
            var date = new Date();
            $scope.currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
           // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var firstDay = moment().startOf('month').format('YYYY-MM-DD');
            var lastDay = moment().endOf('month').format('YYYY-MM-DD');
            var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, orderStatus: ORDER_STATUS.OrderCompleted, translatorId: translatorId, firstDateMonth: firstDay, lastDateMonth:lastDay }
            transproService.getCurrentMonthOrders(filterModel).then(function (response) {
                $scope.orderCompleted = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }

    });

})();