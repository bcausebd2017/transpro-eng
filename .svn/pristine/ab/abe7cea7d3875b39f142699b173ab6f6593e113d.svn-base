(function () {
    "use strict";
    function reportErrorService($q, $http, API_URL, $httpParamSerializer) {
        var vm = this;
        
        function submitReportError(obj) {
            return $http({
                url: API_URL.URL + "ErrorReportWeb/save",
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
                submitReportError: submitReportError
            }
        return service;
    }

    angular
    .module("app")
    .service("reportErrorService", reportErrorService);
    reportErrorService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();