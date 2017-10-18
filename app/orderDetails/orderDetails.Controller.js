(function () {
    'use strict';

    function orderDetailsController($scope, $state, $rootScope, $uibModal, APP_SETTINGS,
                    STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, alertMsg, ORDER_STATUS, PAYMENT_STATUS,
                    TransproUtilityService) {

        $scope.orderTranslated = null;
        $scope.OrderStatus = ORDER_STATUS;
        $scope.UserType = USER_TYPE;
        $scope.PaymentStatus = PAYMENT_STATUS;
        $scope.value = [];

        Activate();

        function Activate() {
            var orderNo = $state.params.orderNo;
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            transproService.getWebOrders({ cultureId: APP_SETTINGS.CultureCode, orderNo: orderNo }).then(function (response) {
                $scope.vm = response[0];
                $scope.value = response;
                if ($scope.vm.OrderStatus == ORDER_STATUS.WaitingForConfirmation) {
                    var DeliveryDate = TransproUtilityService.UpdateOrderAnticipatedDelivery($scope.vm.DeliveryTime, $scope.vm.DeliveryType);
                    $scope.vm.DeliveryDate = DeliveryDate.toString();
                }
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }

        $scope.login = function (type) {
            $uibModal.open({
                component: "loginWindow",
                transclude: true,
                animation: true,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    translatorLogin: true
                },
                size: 'sm'
            });
        };

        $scope.sendMessage = function () {
            if ($scope.CurrentUser.UserType == $scope.UserType.Customer) {
                var customermsg = _.find($scope.value, function (o) { return o.ClientID == $scope.CurrentUser.ID })
                $state.go('message', { "modelData": customermsg });
            }
            if ($scope.CurrentUser.UserType == $scope.UserType.Translator) {
                var transmsg = _.find($scope.value, function (f) { return f.AssignedTranslatorID == $scope.CurrentUser.ID })
                $state.go('message', { "modelData": transmsg });
            }
        };

        $scope.acceptOrder = function (data) {
            $uibModal.open({
                component: "acceptOrderWindow",
                transclude: true,
                animation: true,
                backdrop: 'static',
                keyboard: false,
                resolve: { modalData: function () { return data; } },
                size: 'md',
            });
        };

        $scope.cancelOrder = function () {
            var order = {}
            order.ID = $scope.vm.ID;
            order.OrderStatus = ORDER_STATUS.Cancel;
            transproService.orderOperation(order, "CANCEL").then(function (response) {
                $state.reload();
            })
            .catch(function (error) {
                alertMsg.show('error', error);
            });
        };
    }

    angular.module("app").controller("orderDetailsController", orderDetailsController);
    orderDetailsController.$inject = ["$scope", "$state", "$rootScope", "$uibModal", "APP_SETTINGS",
                        "STORAGE_TYPE", "USER_TYPE", "appStorageFactory", "transproService", "alertMsg",
                        "ORDER_STATUS", "PAYMENT_STATUS", "TransproUtilityService"];

})();