﻿(function () {
    "use strict";
    function loginService($q, $http, API_URL, $httpParamSerializer) {
        var vm = this;

        function login(email,password,culture) {
            return $http({
                url: API_URL.URL + "customer/login"+ "/"+email+"/"+password+"/"+culture,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function translatorlogin(email, password, culture) {
            return $http({
                url: API_URL.URL + "translator/login" + "/" + email + "/" + password + "/" + culture,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }
        function partnerlogin(email, password, culture) {
            return $http({
                url: API_URL.URL + "partner/login" + "/" + email + "/" + password + "/" + culture,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data);
            });
        }



        var service =
            {
                login: login,
                translatorlogin: translatorlogin,
                partnerlogin: partnerlogin,
            }
        return service;
    }

    angular
    .module("app")
    .service("loginService", loginService);
    loginService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();