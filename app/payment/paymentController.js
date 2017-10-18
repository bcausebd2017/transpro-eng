﻿(function () {
    'use strict';

    angular.module("app").controller("paymentController", function (
        $scope, $state, $rootScope, $uibModal, TRANSLATION_TYPE,
        APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, alertMsg, ORDER_STATUS) {

        $scope.Order = null;
        $scope.Variable = {};
        $scope.Variable.DeliveryMethodList = null;

        Activate();

        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);

            //var clientId = $scope.CurrentUser.UserType == USER_TYPE.Customer ? $scope.CurrentUser.ID : null;
            //var translatorId = $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            //var filterModel = { cultureId: APP_SETTINGS.CultureCode, clientId: clientId }
            //transproService.getWebOrders(filterModel).then(function (response) {
            //    $scope.orders = response;
            //}).catch(function (error) {
            //    alertMsg.show('error', error);
            //});

            transproService.getDeliveryMethod().then(function (response) {
                $scope.Variable.DeliveryMethodList = response;
            }).catch(function (error) {
                console.log("Error on getting delivery method list: " + error);
            });

            $scope.Order = $state.params.Order;
            $scope.Order.IsImmediatePayment = true;
            $scope.Order.IsNeeded = false;
            $scope.Order.DeliveryMethodID = null;
            $scope.Order.IsPDFbyEmail = false;
            $scope.Order.IsAfterPaparOutput = false;
            $scope.Order.IsSendRegisteredAddress = true;
            $scope.Order.PostalCode = null;
            $scope.Order.Address = null;
            $scope.Order.NameOfAddress = null;
            $scope.Order.PersonInCharge = null;
            {
                var Content = "";
                Content = Content.concat($scope.Order.SourceLanguage);
                Content = Content.concat("→");
                Content = Content.concat($scope.Order.TargetLanguage).concat(" ");
                var TranslationType;
                switch ($scope.Order.TranslationType) {
                    case TRANSLATION_TYPE.Online:
                        TranslationType = "On-line translation ";
                        break;
                    case TRANSLATION_TYPE.Appointed:
                        TranslationType = "Appointed translation ";
                        break;
                    case TRANSLATION_TYPE.NativeCheck:
                        TranslationType = "Native-Check ";
                        break;
                    case TRANSLATION_TYPE.TranslatorCoordinator:
                        TranslationType = "Translator & Coordinator ";
                        break;
                }
                Content = Content.concat(TranslationType);
                Content = Content.concat($scope.Order.TranslationFieldName).concat(" ");
                Content = Content.concat($scope.Order.DeliveryLevelName).concat(" ");
                Content = Content.concat($scope.Order.DeliveryPlan).concat(" course");
                $scope.Order.Content = Content;
            }
        }
    });

})();