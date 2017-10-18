(function () {
    'use strict';
    function withdrawMembershipController($scope, $rootScope, $state, STORAGE_TYPE, appStorageFactory, USER_TYPE, API_URL, APP_SETTINGS, alertMsg, TRANSLATION_TYPE, translatorService)
    {
        var vm = this;
        vm.CurrentCulture = APP_SETTINGS.CultureCode;
        var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
        


        $scope.withdraw = function (vm) {
            $scope.isTriedSave = true;
            if (!vm.StaffEmailID || vm.StaffEmailID == '' ||
                !vm.Password || vm.Password == '')
                return;

            vm.ID = CurrentUser.ID;

            translatorService.WithdrawMembership(vm).then(function (response) {

                if(response== true)
                {
                    $state.reload();
                    $scope.CurrentUser = "";
                    $state.go('/', { modelData: undefined });
                    appStorageFactory.ClearAll();
                }
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
    }

    angular.module("app").controller("withdrawMembershipController", withdrawMembershipController);
    withdrawMembershipController.$inject = ["$scope", "$rootScope", "$state", "STORAGE_TYPE", "appStorageFactory", "USER_TYPE", "API_URL", "APP_SETTINGS", "alertMsg", "TRANSLATION_TYPE", "translatorService"];
})()