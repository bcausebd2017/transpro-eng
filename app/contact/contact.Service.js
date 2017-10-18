(function () {
    "use strict";
    function saveService($q, $http, API_URL, $httpParamSerializer){
        var vm = this;
        function SaveContact(model) {
            return $http({
                url: API_URL.URL + "Contactus/save",
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
                SaveContact: SaveContact,
               
            }
        return service;

    }
    angular
   .module("app")
   .service("saveService", saveService);
    saveService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();