(function () {
    "use strict";
    function ChangePhotoService($q, $http, API_URL, $httpParamSerializer) {
        var vm = this;

        function changePhoto(obj) {
            return $http({
                url: API_URL.URL + "ChangePhoto/save",
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
                changePhoto: changePhoto
            }
        return service;
    }

    angular
    .module("app")
    .service("ChangePhotoService", ChangePhotoService);
    ChangePhotoService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();