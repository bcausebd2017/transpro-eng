angular.module('app').component('loginWindow', {
    templateUrl: 'app/login/login.tmpl.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: loginController
});

function loginController($scope, $rootScope, $filter, loginService, $uibModal, $state, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, USER_TYPE, alertMsg) {

    var $ctrl = this;
    $ctrl.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{1,5}$/;
    $ctrl.EnableBroadcastSuccessLogin = false;
    $ctrl.BroadcastSuccessLoginAddress = null;
    $ctrl.modalData = {};
    $ctrl.EnableBroadcastSuccessLogin = false;
    $ctrl.EnableBroadcastErrorLogin = false;
    $ctrl.LoginForCustomer = false;
    $ctrl.isTranslatorLogin = false;
    $ctrl.LoggingIn = false;

    if (typeof $ctrl.resolve.modalData != "undefined") {
        $ctrl.modalData = angular.copy($ctrl.resolve.modalData);
        $ctrl.EnableBroadcastSuccessLogin = typeof $ctrl.modalData.BroadcastSuccessLoginAddress != "undefined";
        $ctrl.EnableBroadcastErrorLogin = typeof $ctrl.modalData.BroadcastErrorLoginAddress != "undefined";
        $ctrl.LoginForCustomer = typeof $ctrl.modalData.LoginForCustomer != "undefined";
        $ctrl.isTranslatorLogin = typeof $ctrl.modalData.isTranslatorLogin != "undefined";
        if ($ctrl.EnableBroadcastSuccessLogin == true) {
            $ctrl.BroadcastSuccessLoginAddress = $ctrl.modalData.BroadcastSuccessLoginAddress;
        }
    }

    //$ctrl.$onInit = function () {
    //    if (typeof $ctrl.resolve.modalData != "undefined") {
    //        $ctrl.modalData = angular.copy($ctrl.resolve.modalData);
    //        $ctrl.EnableBroadcastSuccessLogin = typeof $ctrl.modalData.BroadcastSuccessLoginAddress != "undefined";
    //        if ($ctrl.EnableBroadcastSuccessLogin == true) {
    //            $ctrl.BroadcastSuccessLoginAddress = $ctrl.modalData.BroadcastSuccessLoginAddress;
    //        }
    //    }
    //};

    $ctrl.Close = function () {
        $ctrl.resolve = null;
        $ctrl.modalInstance.close($ctrl.resolve);
    };

    $ctrl.openResetWindow = function (param) {
        //$uibModal.open({
        //    component: "resetPasswordWindow",
        //    transclude: true,
        //    resolve: {

        //    },
        //    size: 'sm'
        //});
        $state.go("resetPassword", { type: param });
        $ctrl.resolve = null;
        $ctrl.modalInstance.close($ctrl.resolve);
    };

    $ctrl.login = function () {
        if ($ctrl.Email && $ctrl.Password) {
            $ctrl.LoggingIn = true;
            loginService.login($ctrl.Email, $ctrl.Password, APP_SETTINGS.CultureCode).then(function (response) {
                appStorageFactory.RemoveByKey(STORAGE_TYPE.CurrentUser);
                appStorageFactory.SetStorageObject(STORAGE_TYPE.CurrentUser, response);
                $ctrl.modalInstance.dismiss("cancel");
                if ($ctrl.EnableBroadcastSuccessLogin == true) {
                    $rootScope.$broadcast($ctrl.BroadcastSuccessLoginAddress, response);
                }
                else {
                    $state.reload();
                }
            }).catch(function (error) {
                $ctrl.LoggingIn = false;
                if ($ctrl.EnableBroadcastErrorLogin == true) {
                    $rootScope.$broadcast($ctrl.BroadcastErrorLoginAddress, error);
                }
                alertMsg.show('error', error);
            });
        }
    };

    $ctrl.translatorlogin = function () {
        if ($ctrl.Email && $ctrl.Password) {
            $ctrl.LoggingIn = true;
            loginService.translatorlogin($ctrl.Email, $ctrl.Password, APP_SETTINGS.CultureCode).then(function (response) {
                appStorageFactory.RemoveByKey(STORAGE_TYPE.CurrentUser);
                appStorageFactory.SetStorageObject(STORAGE_TYPE.CurrentUser, response);
                $ctrl.modalInstance.dismiss("cancel");
                if ($ctrl.EnableBroadcastSuccessLogin == true) {
                    $rootScope.$broadcast($ctrl.BroadcastSuccessLoginAddress, response);
                }
                else {
                    $state.reload();
                }
            }).catch(function (error) {
                $ctrl.LoggingIn = false;
                alertMsg.show('error', error);
            });
        }
    };

    $ctrl.partnerlogin = function () {
        if ($ctrl.Email && $ctrl.Password) {
            $ctrl.LoggingIn = true;
            loginService.partnerlogin($ctrl.Email, $ctrl.Password, APP_SETTINGS.CultureCode).then(function (response) {
                appStorageFactory.RemoveByKey(STORAGE_TYPE.CurrentUser);
                appStorageFactory.SetStorageObject(STORAGE_TYPE.CurrentUser, response);
                $ctrl.modalInstance.dismiss("cancel");
                if ($ctrl.EnableBroadcastSuccessLogin == true) {
                    $rootScope.$broadcast($ctrl.BroadcastSuccessLoginAddress, response);
                }
                else {
                    $state.reload();
                }
            }).catch(function (error) {
                $ctrl.LoggingIn = false;
                alertMsg.show('error', error);
            });
        }
    };

    $ctrl.Dismiss = function () {
        $ctrl.modalInstance.dismiss("cancel");
    };
    $ctrl.$onInit = function () {
        $ctrl.isTranslatorLogin = $ctrl.resolve.translatorLogin;
    };
    $ctrl.GoRegistration = function () {
        $state.go("userRegistration");
        $ctrl.resolve = null;
        $ctrl.modalInstance.close($ctrl.resolve);
    };
    $ctrl.GoTranslatorReg = function () {
        $state.go("translatorReg");
        $ctrl.resolve = null;
        $ctrl.modalInstance.close($ctrl.resolve);
    };
}