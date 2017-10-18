(function () {
    "use strict";
    function alertMsg($q, $http, API_URL, $httpParamSerializer, APP_SETTINGS, $uibModal) {

        function show(type, description) {
            $uibModal.open({
                component: "alertWindow",
                transclude: true,
                resolve: {
                    type: function () {
                        return type;
                    },
                    description: function () {
                        return description;
                    }
                },
                size: 'md'
            });
        }

        var service =
        {
            show: show,
        }

        return service;
    }

    angular
    .module("app")
    .service("alertMsg", alertMsg);
    alertMsg.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer", "APP_SETTINGS", "$uibModal"]
})();