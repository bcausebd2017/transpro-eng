(function () {
    'use strict';
    angular.module("app").controller("orderAppointedController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService) {
        $scope.orders = null;
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, translatorId: translatorId }
            transproService.getAppointedOrders(filterModel).then(function (response) {
                $scope.orders = response;
            }).catch(function (error) {
                $scope.orders = [];
                alertMsg.show('error', error);
            });
        }
    });

})();