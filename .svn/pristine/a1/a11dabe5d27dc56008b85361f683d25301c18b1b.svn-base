(function () {
    'use strict';
    angular.module("app").controller("detailProfileController", function ($scope, $state, $stateParams, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, translatorService,alertMsg) {
        Activate();
        function Activate() {
            var transNo = $stateParams.no;
            translatorService.getTranslatorProfile({ TranslatorNo: transNo }).then(function (response) {
                $scope.vm = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
    });

})();