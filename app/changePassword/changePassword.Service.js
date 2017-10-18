(function () {
    "use strict";
    function ChangePasswordService($q, $http, API_URL, $httpParamSerializer) {
        var vm = this;

        function checkPassword(emailId, oldpass) {
            return $http({
                url: API_URL.URL + "translator/checkpassword/" + emailId + "/" +oldpass,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function ChangePassword(obj) {
            return $http({
                url: API_URL.URL + "ChangePassword/save",
                method: "POST",
                data: obj
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }
        var service =
            {
                checkPassword: checkPassword,
                ChangePassword: ChangePassword,
            }
        return service;
    }
    angular
    .module("app")
    .service("ChangePasswordService", ChangePasswordService);
    ChangePasswordService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();