(function () {
    "use strict";
    function transproService($q, $http, API_URL, $httpParamSerializer, APP_SETTINGS) {

        var vm = this;

        //get hotel specifications
        function getLanguages(IncludeNativeCheck) {
            if (typeof IncludeNativeCheck == "undefined") {
                IncludeNativeCheck = false;
            }
            return $http({
                url: API_URL.URL + "language/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode },
                params: {IncludeNativeCheck: IncludeNativeCheck}
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getTargetLanguageList(sourceLangID, IsNativeAllowed) {
            var config = {};
            config.url = API_URL.URL + "transprolang/targetlanguagelist/" + APP_SETTINGS.CultureCode + "/" + sourceLangID + "/" + IsNativeAllowed;
            config.method = "GET";
            //config.params = { SourceLangID: sourceLangID, CurrentCulture: APP_SETTINGS.CultureCode, IsNativeAllowed: IsNativeAllowed };
            return $http(config).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

      
        function getLanguageslvl() {
            return $http({
                url: API_URL.URL + "languagelvlist/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function gettranslatorsoftwareskills() {
            return $http({
                url: API_URL.URL + "StaffSoftwareSkill/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getCountries() {
            return $http({
                url: API_URL.URL + "country/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getBank() {
            return $http({
                url: API_URL.URL + "bank/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

        function getBankBranch() {
            return $http({
                url: API_URL.URL + "bankbranch/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getImageById(translatorId, cultureId) {
            return $http({
                url: API_URL.URL + "translator/getImageById" + "/" + translatorId + "/" + cultureId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getEducatinalDegree() {
            return $http({
                url: API_URL.URL + "education/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getCurrentState() {
            return $http({
                url: API_URL.URL + "currentstate/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        //function getProfessional() {
        //    return $http({
        //        url: API_URL.URL + "profession/list",
        //        method: "POST",
        //        data: { CurrentCulture: APP_SETTINGS.CultureCode }
        //    }).then(function (response) {
        //        return response.data;
        //    }).catch(function (error) {
        //        return $q.reject(error.data);
        //    });
        //}
        function getTranslationFileds() {
            return $http({
                url: API_URL.URL + "estSpecializedFields/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function GetSubSpecialityFields() {
            return $http({ url: API_URL.URL + "estimationssf/list", method: "POST", data: { CurrentCulture: APP_SETTINGS.CultureCode } })
            .then(function (response) { return response.data; })
            .catch(function (error) { return $q.reject(error.data.Message); });
        }

        function getIndustryClassifications() {
            return $http({
                url: API_URL.URL + "companyindustryclassification/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        
        function getTransproDeliveryTypeList() {
            return $http({
                url: API_URL.URL + "transproDeliveryPlan/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getBankAccountType() {
            return $http({
                url: API_URL.URL + "bankAccountType/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function getCustomerById(customerId, cultureId) {
            return $http({
                url: API_URL.URL + "customer/getCustomerById" + "/" + customerId + "/" + cultureId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getTranslatorById(translatorId, cultureId) {
            return $http({
                url: API_URL.URL + "translator/getTranslatorById" + "/" + translatorId + "/" + cultureId,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function resetCustomerPassword(email, usertype) {
            return $http({
                url: API_URL.URL + "customer/resetPassword/" + email + "/" + usertype+"/" + APP_SETTINGS.CultureCode,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function setNewPassword(model) {
            return $http({
                url: API_URL.URL + "setPassword/setNewPassword",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function getWebOrders(model) {
            model.ApplicationId = APP_SETTINGS.ApplicationId;
            return $http({
                url: API_URL.URL + "order/getWebOrders",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function getTransproLanguagePriceCategory(model) {
            return $http({
                url: API_URL.URL + "transprolpc/list", method: "POST", data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function EstimateManuscript(TextData) {
            return $http({
                url: API_URL.URL + "transpro/manuscript/", method: "POST", data: {PlainText : TextData}
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        //function GetDivision(model) {
        //    return $http({
        //        url: API_URL.URL + "division/list", method: "POST", data: model
        //    }).then(function (response) {
        //        return response.data;
        //    }).catch(function (error) {
        //        return $q.reject(error.data.Message);
        //    });
        //}

        function getEstimationTypeList() {
            return $http({
                url: API_URL.URL + "estimationServiceType/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function getAppointedOrders(model) {
            model.ApplicationId = APP_SETTINGS.ApplicationId;
            return $http({
                url: API_URL.URL + "order/getAppointedOrders",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function saveEstimation(model) {
            return $http({
                url: API_URL.URL + "transpro/estimationsave",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getCurrentMonthOrders(model) {
            model.ApplicationId = APP_SETTINGS.ApplicationId;
            return $http({
                url: API_URL.URL + "order/getCurrentMonthOrders",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getDeliveryMethod() {
            return $http({
                url: API_URL.URL + "transpro/deliverymethod",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function SaveOrderWeb(Order) {
            var config = {};
            config.url = API_URL.URL + "order/saveWebOrder";
            config.method = "POST";
            config.data = Order;
            return $http(config).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function orderOperation(order,type) {
            return $http({
                url: API_URL.URL + "order/orderOperation",
                method: "POST",
                data: order,
                params: {type:type}
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        function getadvertisement() {
            return $http({
                url: API_URL.URL + "advertizementsettings/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getPenaltyList() {
            return $http({
                url: API_URL.URL + "penalty/list",
                method: "POST",
                data: { CurrentCulture: APP_SETTINGS.CultureCode,ApplicationId : APP_SETTINGS.ApplicationId }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getTranslationPriceList(model) {
            return $http({
                url: API_URL.URL + "transpro/translationFees",
                method: "POST",
                data:model // { CurrentCulture: APP_SETTINGS.CultureCode, CurrencyID: APP_SETTINGS.CurrencyId }
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getBillBreakdownById(receiverID) {
            return $http({
                url: API_URL.URL + "orderdetails/breaklist" + "/" + receiverID,
                method: "POST"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function getBillBreakdownDetailsByMonth(m) {
            return $http({
                url: API_URL.URL + "orderdetails/breakdlslist" + "/" + m,
                method: "POST"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }

         
        var service = {
            getEducatinalDegree: getEducatinalDegree,
            getLanguages: getLanguages,
            getTargetLanguageList: getTargetLanguageList,
            getCurrentState: getCurrentState,
            getCountries: getCountries,
            getTranslationFileds: getTranslationFileds,
            getIndustryClassifications: getIndustryClassifications,
            getBankAccountType: getBankAccountType,
            //getProfessional: getProfessional,
            getTranslatorById: getTranslatorById,
            getCustomerById: getCustomerById,
            getTransproDeliveryTypeList: getTransproDeliveryTypeList,
            getLanguageslvl: getLanguageslvl,
            resetCustomerPassword: resetCustomerPassword,
            setNewPassword: setNewPassword,
            getWebOrders: getWebOrders,
            getTransproLanguagePriceCategory: getTransproLanguagePriceCategory,
            EstimateManuscript: EstimateManuscript,
            gettranslatorsoftwareskills: gettranslatorsoftwareskills,
            GetSubSpecialityFields: GetSubSpecialityFields,
            //GetDivision:GetDivision,
            getBank: getBank,
            getBankBranch: getBankBranch,
            getEstimationTypeList: getEstimationTypeList,
            getAppointedOrders: getAppointedOrders,
            getImageById: getImageById,
            saveEstimation: saveEstimation,
            getCurrentMonthOrders: getCurrentMonthOrders,
            getDeliveryMethod: getDeliveryMethod,
            SaveOrderWeb: SaveOrderWeb,
            orderOperation: orderOperation,
            getadvertisement: getadvertisement,
            getPenaltyList: getPenaltyList,
            getTranslationPriceList: getTranslationPriceList,
            getBillBreakdownById: getBillBreakdownById,
            getBillBreakdownDetailsByMonth: getBillBreakdownDetailsByMonth
        };
        return service;
    }

    angular
    .module("app")
    .service("transproService", transproService);
    transproService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer", "APP_SETTINGS"];
})();