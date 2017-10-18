(function () {
    "use strict";
    function footermenuService($q, $http, API_URL, $httpParamSerializer) {


        function GetNotice(model) {
            return $http({
                url: API_URL.URL + "notice/list",
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
                  GetNotice: GetNotice,
              }
        return service;
    }

    angular
    .module("app")
    .service("footermenuService", footermenuService);
    footermenuService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();