(function () {
    'use strict';
    angular.module("app").controller("orderBreakdownController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService) {

        $scope.currentPage = 1
        $scope.totalOrders = null;
        $scope.orders = null;
        $scope.numPerPageOrders = 20 ;

        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);

            var clientId = $scope.CurrentUser.UserType == USER_TYPE.Customer ? $scope.CurrentUser.ID : null;
            var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, clientId: clientId, translatorId: translatorId }
            transproService.getWebOrders(filterModel).then(function (response) {
                $scope.orders = response;
                $scope.totalOrders = response.length;
                $scope.filterOrders = response;
                if ($scope.totalOrders > $scope.numPerPageOrders)
                    $scope.doCtrlPagingOrders(1);
            }).catch(function (error) {
                $scope.orders = [];
                alertMsg.show('error', error);
            });
        }

        $scope.doCtrlPagingOrders = function (page) {

            var begin = ((page - 1) * $scope.numPerPageOrders);
            var end = begin + $scope.numPerPageOrders;

            $scope.filterOrders = $scope.orders.slice(begin, end);

        }
    });

})();