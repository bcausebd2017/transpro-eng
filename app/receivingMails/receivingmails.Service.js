(function () {
    "use strict";
    function receivingmailService($q, $http, API_URL, $httpParamSerializer) {



        function SaveEmailSettings(model) {
            return $http({
                url: API_URL.URL + "emaildeliverysettings/save",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }



        function GetEmailSettingsByID(model) {
            return $http({
                url: API_URL.URL + "emaildeliverysettings/getByID",
                method: "POST",
                data: model
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

      var service =
            {
                SaveEmailSettings: SaveEmailSettings,
                GetEmailSettingsByID: GetEmailSettingsByID,
            }
        return service;
    }

    angular
    .module("app")
    .service("receivingmailService", receivingmailService);
    receivingmailService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();