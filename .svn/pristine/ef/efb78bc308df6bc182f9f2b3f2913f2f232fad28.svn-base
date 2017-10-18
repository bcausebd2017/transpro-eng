(function () {
    'use strict';
    angular.module("app").controller("ChangePasswordController", function ($scope, $state, $rootScope, $uibModal, transproService, ChangePasswordService, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg) {
        var vm = this;
        vm.model = {};
        vm.checkpass = "";
        vm.model.StaffEmailID = $scope.CurrentUser.Email;
        var modelData = $state.params.modelData;
        var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
        $scope.checkPassword = function () {
            ChangePasswordService.checkPassword(vm.model.StaffEmailID, vm.OldPass, APP_SETTINGS.CultureCode).then(function (response) {
               vm.checkpass = true;
            }).catch(function (error) {
                vm.checkpass = false;
            });
        }
        $scope.ChangePassword = function () {
            $scope.isTriedSave = true;
            if (!isValidInput())
                return;
            vm.model.ApplicationID = APP_SETTINGS.ApplicationId;
            vm.model.ID = CurrentUser.ID;
            ChangePasswordService.ChangePassword(vm.model).then(onSuccessSave).catch(function (error) {
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        var onSuccessSave = function (response) {
            alertMsg.show('success', 'Your Old Password has been changed.');
            $state.go("/");
        }

        function isValidInput() { }
        if (!vm.model.Password || !vm.Repass || vm.model.Password == "") {
            return false;
        }
        if (!vm.model.Password !== !vm.Repass) {
            return false;
        }
        return true;

    });
})();