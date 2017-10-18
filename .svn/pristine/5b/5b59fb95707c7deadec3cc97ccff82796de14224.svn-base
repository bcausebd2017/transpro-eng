(function () {
    'use strict';
    angular.module("app").controller("billbreakdownController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, MessageService, alertMsg, ORDER_STATUS) {

        // doing good
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);

            transproService.getBillBreakdownById($scope.CurrentUser.ID).then(function (response) {
                $scope.receivemsg = response;

            }).catch(function (error) {
                alertMsg.show('error', error);
            });
            var today = new Date();
            var m = today.getMonth();           
            transproService.getBillBreakdownDetailsByMonth(parseInt(m+1)).then(function (response) {
                $scope.breakdowndetails = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        $scope.details = function (id) {
            transproService.getBillBreakdownDetailsByMonth(parseInt(id)).then(function (response) {
                $scope.breakdowndetails = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        };
    });

})();