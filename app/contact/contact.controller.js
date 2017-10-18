(function () {
    'use strict';

    function contactController($scope, $state, $uibModal, transproService, STORAGE_TYPE, appStorageFactory, USER_TYPE, API_URL, saveService, alertMsg, APP_SETTINGS) {
        var vm = this;
        vm.model = {};

        $scope.SaveContact = function () {
           

            $scope.isTriedSave = true;
            if (!isValidInput())
                return;
            vm.model.ApplicationID = APP_SETTINGS.ApplicationId;
            vm.model.CurrentCulture = APP_SETTINGS.CultureCode;
            vm.model.IsActive = 1;
            vm.model.IsDeleted = 0;
            vm.model.IsReplied = 0;
            vm.model.IsApplication = false;
            saveService.SaveContact(vm.model).then(function (response) {
                alertMsg.show('success', 'Your Message has ben sent');
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        function isValidInput() {
            if (!vm.model.CompanyName || vm.model.CompanyName == "") {
                return false;
            }
            if (!vm.model.Name || vm.model.Name == "") {
                return false;
            }
            if (!vm.model.DivisionName || vm.model.DivisionName == "") {
                return false;
            }
            if (!vm.model.TelNumber || vm.model.TelNumber == "") {
                return false;
            }
            if (!vm.model.Email || vm.model.Email == "") {
                return false;
            }
            if (!vm.model.Comment || vm.model.Comment == "") {
                return false;
            }
            if (!vm.model.CompanyURLOne || vm.model.CompanyURLOne == "") {
                return false;
            }
            if (!vm.model.CompanyURLTwo || vm.model.CompanyURLTwo == "") {
                return false;
            }
            return true;
        };
  
    }

    angular
       .module("app")
       .controller("contactController", contactController);
    contactController.$inject = ["$scope", "$state", "$uibModal", "transproService", "STORAGE_TYPE", "appStorageFactory", "USER_TYPE", "API_URL", "saveService", "alertMsg", "APP_SETTINGS"];

})();
