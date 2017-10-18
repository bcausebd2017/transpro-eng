angular.module('app').component('alertWindow', {
    templateUrl: 'app/alertmsgHandling/alert.tmpl.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: alertController
});

function alertController($scope, $rootScope, $filter, $uibModal, $state, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, USER_TYPE) {
    var $ctrl = this;
    $ctrl.$onInit = function () {
        $scope.type = $ctrl.resolve.type;
        $scope.description = $ctrl.resolve.description;
    }
    $ctrl.Close = function () {
        $ctrl.resolve = null;
        $ctrl.modalInstance.close($ctrl.resolve);
    };
   
    $ctrl.Dismiss = function () {
        $ctrl.modalInstance.dismiss("cancel");
    };
   
}