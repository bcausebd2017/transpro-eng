(function () {
    'use strict';
    angular.module("app").controller("mypageController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService,MessageService, alertMsg, ORDER_STATUS) {
        $scope.orders = null;
        $scope.OrderStatus = ORDER_STATUS;
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);

            var clientId = $scope.CurrentUser.UserType == USER_TYPE.Customer ? $scope.CurrentUser.ID :null;
            var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, clientId: clientId }
            transproService.getWebOrders(filterModel).then(function (response) {
                $scope.orders = response;
            }).catch(function (error) {
                $scope.orders = [];
                alertMsg.show('error', error);
            });

            MessageService.getReceiveMsgById($scope.CurrentUser.ID).then(function (response) {
                $scope.receivemsg = response;
            }).catch(function (error) {
                $scope.receivemsg = [];
                alertMsg.show('error', error);
            });

            //$scope.read = function (msgID) {
            //    $scope.msgID = msgID;
            //    var messageread = _.find($scope.receivemsg, function (o) { return o.ID == msgID })
            //    $state.go('messageread', { "modelData": messageread });
            //};

        }     
    });

})();