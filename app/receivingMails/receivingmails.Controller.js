(function () {
    'use strict';
    angular.module("app").controller("receivingmailController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg, receivingmailService) {
        var vm = this;
        vm.CurrentCulture = APP_SETTINGS.CultureCode;
         var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
         vm.CustomerID = '';
         vm.StaffID = '';
       

       
        vm.init = function () {

            if (CurrentUser.UserType == 1) {
                vm.CustomerID = CurrentUser.ID;
            }
            else if (CurrentUser.UserType == 2) {
                vm.StaffID = CurrentUser.ID;
            }
            getEmailDeliverySettings();
        }

       var getEmailDeliverySettings = function () {
          
           receivingmailService.GetEmailSettingsByID(vm).then(function (response) {
                $scope.vm = angular.copy(response);

            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
     
        $scope.Save = function (vm)
        {

            $scope.isTriedSave = true;

            if (!vm.Email || vm.Email=='') {
                return false;
            }

            receivingmailService.SaveEmailSettings(vm).then(function (response) {

                alertMsg.show('success', 'Email Delivery Settings Successfully.');
              
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
    });
    
}) ();