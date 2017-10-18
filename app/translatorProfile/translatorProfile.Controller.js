angular.module('app').component('translatorProfileWindow', {
    templateUrl: 'app/translatorProfile/translatorProfile.tmpl.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: translatorprofileController
});

translatorprofileController.$inject = ["$scope", "$state", "$rootScope", "$uibModal", "$stateParams", "APP_SETTINGS", "appStorageFactory", "STORAGE_TYPE", "alertMsg", "transproService", "translatorService"];

function translatorprofileController($scope, $state, $rootScope, $uibModal, $stateParams, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg, transproService, translatorService) {
        var vm = this;
        vm.CurrentCulture = APP_SETTINGS.CultureCode;
        var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);

        vm.$onInit = function () {

            //   $scope.vm = angular.copy(vm.resolve.translatorNo);
            
            translatorService.getTranslatorProfile({ TranslatorNo: vm.resolve.translatorNo }).then(function (response) {
                $scope.vm = response;
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }


        vm.Close = function () {
            vm.modalInstance.close(vm.modalData);
        };
    

    }



       