﻿(function () {
    'use strict';
    angular.module("app").controller("registrationController", function ($scope, $state, $rootScope, $uibModal, transproService, registrationService, APP_SETTINGS, COMPANY_REGISTRATION_TYPE, appStorageFactory,STORAGE_TYPE,alertMsg) {
        var vm = this;
        $scope.isIndustryLoaded = false;
        vm.ReEmail = "";
        vm.RePass = "";
        $scope.receipt = true;
        $scope.invoice = true;
        $scope.note = true;
        $scope.address = true;

        if ($state.params.modelData) {
            vm.model = $state.params.modelData;
            vm.IsModifyState = true;
            $scope.address = false;
        } else {
            vm.model = {};
            vm.model.IsRecieveEmail = true;
            vm.model.IsPostTransactionAllowed = true;
            vm.IsModifyState = false;
        }
        
        Activate();
        function Activate() {
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            vm.model.RegistrationType = appStorageFactory.GetStorageObject(STORAGE_TYPE.RegisterType);
            transproService.getCountries().then(function (response) {
                vm.countries = response;
            }).catch(function (error) {
                toastr.error(error);
            });

            transproService.getIndustryClassifications().then(function (response) {
                vm.classifications = response;                
                _.forEach(vm.classifications,function(f){
                    _.forEach(f.itemList, function (g) {
                        if (vm.IsModifyState) {
                            var findObj = _.find(vm.model.IndustryClassifications, function (r) {
                                return r.CompanyID == vm.model.ID && r.IndustryClassificationID == f.Id && r.IndustryClassificationItemID == g.Id
                            });
                            if (findObj)
                                g.IsSelected = true;
                        } else {
                            g.IsSelected = false;
                        }
                        g.IndustryClassificationID = f.Id;
                        g.IndustryClassificationItemID = g.Id;
                    });
                });
                $scope.isIndustryLoaded = true;
            }).catch(function (error) {
                $scope.isIndustryLoaded = true;
            });

            getDeliveryMethod();
        }
        $scope.goIndividualReg = function (type) {
            appStorageFactory.SetStorageObject(STORAGE_TYPE.RegisterType, type);
            $state.go("registration");
        }
        $scope.goTranslatorReg = function () {
            $state.go("translatorReg");
        }

        function getDeliveryMethod()
        {
            transproService.getDeliveryMethod().then(function (response) {
                vm.deliveryMethod = response;
            }).catch(function (error) {
                toastr.error(error);
            });
        }
        $scope.register = function () {
            $scope.isTriedSave = true;
            if (!isValidInput())
                return;
            vm.model.ApplicationId = APP_SETTINGS.ApplicationId;
            vm.model.CurrentCulture = APP_SETTINGS.CultureCode;
            vm.model.RegistrationType = $scope.regType;
            vm.model.IndustryClassifications = [];
            _.forEach(vm.classifications, function (f) {
                _.forEach(f.itemList, function (g) {
                    if (g.IsSelected)
                        vm.model.IndustryClassifications.push(g);
                });
            });
            //vm.model.IsRecieveEmail = vm.RecieveEmail == 1 ? true : false;
            //vm.model.IsPostTransactionAllowed = vm.AllowPostingTransactions == 2 ? true : false;
            registrationService.registerCustomer(vm.model).then(function (response) {
                if (!vm.IsModifyState) {
                    alertMsg.show('success','Your have been registered successfully.');
                    $state.go("successRegistration");
                } else {
                    $state.go("/");
                }
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        function isValidInput() {
            if (!vm.IsModifyState) {
                if (!vm.model.ClientID || !vm.ReEmail || vm.model.ClientID == "") {
                    return false;
                }
                if (!vm.model.ClientID !== !vm.ReEmail) {
                    return false;
                }
                if (!vm.model.Password || !vm.RePass || vm.model.Password == "") {
                    return false;
                }
                if (!vm.model.Password !== !vm.RePass) {
                    return false;
                }
            }
            if (!vm.model.Name || vm.model.Name == "") {
                return false;
            }
            if (!vm.model.TelephoneNo || vm.model.TelephoneNo == "") {
                return false;
            }
            return true;
        }
        $scope.checkExistingCustomer = function () {
            if (!vm.IsModifyState) {
                if (!vm.model.ClientID || vm.model.ClientID == "") {
                    // toastr.error("Please enter valid Email ID");
                    vm.IsOperationCompleted = false;
                    alertMsg.show('alert', 'Please enter valid Email ID.');
                    return false;
                }
            }
            registrationService.checkExistingCustomer(vm.model.ClientID, APP_SETTINGS.CultureCode).then(function (response) {
                vm.IsOperationCompleted = true;
                vm.custmerExisted = false;
            }).catch(function (error) {
                vm.IsOperationCompleted = true;
                vm.custmerExisted = true;
                alertMsg.show('alert', "Email ID already exist,please use another one.");
            });

        }

    });

})();