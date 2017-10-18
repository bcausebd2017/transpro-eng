(function () {
    'use strict';
    angular.module("app").controller("setPasswordController", function ($scope, $state, $stateParams, $rootScope, $uibModal, transproService, alertMsg, APP_SETTINGS) {
        var vm = this;
        vm.model = {};
        $scope.NewPassword = "";
        var userID = $stateParams.UserID;
        var type = $stateParams.UserType;
        $scope.SetNewPassword = function () {
            $scope.isTriedSave = true;
            if ($scope.NewPassword == "" || !vm.model.Password) {
                return;
            }
            vm.model.UserType = type;
            vm.model.UserID = userID;
            vm.model.CultureCode = APP_SETTINGS.CultureCode;
            transproService.setNewPassword(vm.model).then(function (response) {
                alertMsg.show('success', 'Your new password has been set successfully.');
                $state.go("/");
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
    });

})();