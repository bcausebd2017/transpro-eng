angular.module('app').component('acceptOrderWindow', {
    templateUrl: 'app/orderDetails/acceptenceConfirmation.tmpl.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: acceptOrderController
});

function acceptOrderController($scope, $rootScope, $filter, transproService, $uibModal, $state, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, USER_TYPE, alertMsg, ORDER_STATUS) {

    var $ctrl = this;
    var currentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
    $ctrl.Dismiss = function () {
        $ctrl.modalInstance.dismiss("cancel");
    };
    $ctrl.$onInit = function () {
        $scope.order = $ctrl.resolve.modalData;
    };
    $scope.checkAgreement = function (value) {
        if (value)
            $scope.IsEnable = true;
    };
    $ctrl.acceptPlan = function () {
        var order = {}
        order.ID = $scope.order.ID;
        order.OrderStatus = ORDER_STATUS.InProgress;
        order.AssignedTranslatorID = currentUser.ID;          
        transproService.orderOperation(order,"ACCEPT").then(function (response) {
            $state.reload();
            $ctrl.Dismiss();
        })
        .catch(function (error) {
            alertMsg.show('error', error);
        });
    }
}