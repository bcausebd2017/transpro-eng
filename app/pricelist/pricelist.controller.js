(function () {
    'use strict';
    angular.module("app").controller("pricelistController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS,STORAGE_TYPE, appStorageFactory, transproService, alertMsg) {
        Activate();
        function Activate() {
            $scope.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            transproService.getLanguages().then(function (response) {
                $scope.languages = response;
                $scope.languageList = response;
                $scope.srcLanguage = _.find(response, function (f) { return f.Code == 'eng' }).ID;
                if (!$scope.selectLanguage)
                    $scope.destLanguage = _.find(response, function (f) { return f.Code == 'jpn' }).ID;
                else
                    $scope.destLanguage = $scope.selectLanguage;
            }).catch(function (error) {
                //toastr.error(error);
            });

            transproService.getTranslationFileds().then(function (response) {
                $scope.translationFields = response;
                $scope.selectField = response[0].ID;
                $scope.getPriceList();
            }).catch(function (error) {
               // alertMsg.show('error', error);
            });
        }
        $scope.$on('targetLanguageChanged', function (event, data) {
            $scope.destLanguage = data;
        });
        $scope.getPriceList = function () {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var obj = { SourceLanguageID: $scope.srcLanguage, TargetLanguageID: $scope.destLanguage, SpecialFieldID: $scope.selectField, CurrencyID: APP_SETTINGS.CurrencyId, CurrentCulture: APP_SETTINGS.CultureCode, FromDate: firstDay, ToDate: lastDay }
            transproService.getTranslationPriceList(obj).then(function (response) {
                $scope.translationFees = response;
            }).catch(function (error) {
                // alertMsg.show('error', error);
            });
        }
    });

})();