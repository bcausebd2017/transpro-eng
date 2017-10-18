(function () {
    'use strict';

    function inquiryController($scope, $state, $uibModal, transproService, STORAGE_TYPE, appStorageFactory, USER_TYPE, API_URL, saveService, alertMsg, APP_SETTINGS) {
        var vm = this;
        vm.model = {};
        vm.model.IsApplication = false;
        vm.isDisabled = true;
        vm.zmodel = null;
        $scope.OpenConfirmationWindow = function () {
            $scope.isTriedSave = true;
            $scope.check = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{1,5}$/;
            if (!isValidInput())
                return;
            var binding = {};
            binding.component = "inquiryComponent";
            binding.resolve = {};
            binding.resolve.modalData = vm.model;
            binding.resolve.title = function () { return "Contact Us"; };
            $uibModal.open(binding);
        };
        vm.isCheckboxSelected = function (status) {

            if (status.checkboxSelection == true) {
                vm.isDisabled = false;
            }
            else {
                vm.isDisabled = true;
            }

        };

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
       .controller("inquiryController", inquiryController);
       inquiryController.$inject = ["$scope", "$state", "$uibModal", "transproService", "STORAGE_TYPE", "appStorageFactory", "USER_TYPE", "API_URL", "saveService", "alertMsg", "APP_SETTINGS"];



       function inquiryModalController($scope, $state, $uibModal, transproService, STORAGE_TYPE, appStorageFactory, USER_TYPE, API_URL, saveService, alertMsg, APP_SETTINGS) {
           var vm = this;
           vm.model = {};
           vm.model.IsContactUs = true;

           vm.$onInit = function () {
               vm.model = angular.copy(vm.resolve.modalData);
             
           };

           vm.Save = function () {
              
            
               
               vm.model.ApplicationID = APP_SETTINGS.ApplicationId;
               vm.model.CurrentCulture = APP_SETTINGS.CultureCode;
               vm.model.IsActive = 1;
               vm.model.IsDeleted = 0;
               vm.model.IsReplied = 0;
               saveService.SaveContact(vm.model).then(function (response) {
                   vm.Close();
                   alertMsg.show('success', 'Save Successfully.');
               }).catch(function (error) {
                   vm.Close();
                   alertMsg.show('error', error);
               });
               
           };

           vm.Close = function () {
               vm.resolve.modalData = null;
               vm.modalInstance.close(vm.modalData);
           };

           vm.Dismiss = function () {
               vm.modalInstance.dismiss("cancel");
           };
       }
       inquiryModalController.$inject = ["$scope", "$state", "$uibModal", "transproService", "STORAGE_TYPE", "appStorageFactory", "USER_TYPE", "API_URL", "saveService", "alertMsg", "APP_SETTINGS"];

    angular.module('app').component('inquiryComponent', {
        templateUrl: 'app/business/Inquiry.html',
        bindings: {
            modalInstance: "<",
            resolve: "<"
        },
        controller: inquiryModalController,
        controllerAs: 'vm'
    });


})();
