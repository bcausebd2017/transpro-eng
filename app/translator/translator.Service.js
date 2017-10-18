﻿(function () {
    "use strict";
    function translatorService($q, $http, API_URL, $httpParamSerializer, APP_SETTINGS) {
        var vm = this;

        //save list
        function registerTranslator(obj) {
            return $http({
                url: API_URL.URL + "translator/registration",
                method: "POST",
                data:obj
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function searchTranslator(srcLanguageID,targetLanguageID,specialFieldID) {
            return $http({
                url: API_URL.URL + "traslator/searchTranslator",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode, ApplicationId: APP_SETTINGS.ApplicationId },
                params: { srcLanguageID: !srcLanguageID ? "0" : srcLanguageID, targetLanguageID: !targetLanguageID ? "0" :targetLanguageID , specialFieldID: (!specialFieldID ? "0" : specialFieldID) }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function GetMasterData() {
            var config = new Object();
            config.url = API_URL.URL + "translator/getMasterData";
            config.method = "POST";
            config.data = { CurrentCulture: APP_SETTINGS.CultureCode, ApplicationId: APP_SETTINGS.ApplicationId };
            return $http(config).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            })
        }

        //function storeCurrentState(list) {
        //    return $http({
        //        url: API_URL.URL + "staffcurrentstate/savelist",
        //        method: "POST",
        //        data: list
        //    }).then(function (response) {
        //        return response.data;
        //    }).catch(function (error) {
        //        return $q.reject(error.data.Message);
        //    });
        //}

        //function storeProfession(list) {
        //    return $http({
        //        url: API_URL.URL + "staffprofessionalspecial/savelist",
        //        method: "POST",
        //        data: list
        //    }).then(function (response) {
        //        return response.data;
        //    }).catch(function (error) {
        //        return $q.reject(error.data.Message);
        //    });
        //}
        //function storeStaffsoftware(list) {
        //    return $http({
        //        url: API_URL.URL + "staffSoftwareSkill/savelist",
        //        method: "POST",
        //        data: list
        //    }).then(function (response) {
        //        return response.data;
        //    }).catch(function (error) {
        //        return $q.reject(error.data.Message);
        //    });
        //}

        function checkExistingTranslator(emailId, culture) {
            return $http({
                url: API_URL.URL + "translator/checkExistingTranstalor/" + emailId + "/" + culture,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getTranslatorProfile(model) {
            model.CultureCode = APP_SETTINGS.CultureCode;
            return $http({
                url: API_URL.URL + "translator/getTranslatorProfile",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        var service =
            {
                registerTranslator: registerTranslator,
                searchTranslator:searchTranslator,
                //storeCurrentState: storeCurrentState,
                //storeProfession: storeProfession,
                checkExistingTranslator: checkExistingTranslator,
                //storeStaffsoftware: storeStaffsoftware
                getTranslatorProfile: getTranslatorProfile,
                GetMasterData: GetMasterData

            }
        return service;


    }
    

    angular
    .module("app")
    .service("translatorService", translatorService);
    translatorService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer", "APP_SETTINGS"]
})();