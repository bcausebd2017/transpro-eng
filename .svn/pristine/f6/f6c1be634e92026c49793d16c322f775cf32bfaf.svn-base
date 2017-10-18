(function () {
    'use strict'
    angular.module("app").factory("appStorageFactory", function ($cookies,$window) {
        return {
            SetCookieData: function (key, value) {
                $cookies.remove(key);
                $cookies.put(key, value);
            },
            SetCookieObject: function (key, data) {
                $cookies.putObject(key, data);
            },
            GetCookieData: function (key) {
                return $cookies.get(key);
            },
            GetCookieObject: function (key) {
                return $cookies.getObject(key);
            },
            SetStorageObject : function(key,value){
                $window.localStorage.setItem(key, angular.toJson(value));
            },
            GetStorageObject: function (key) {
                return  angular.fromJson($window.localStorage.getItem(key));
            },
            RemoveByKey: function (key) {
                $cookies.remove(key);
                $window.localStorage.removeItem(key);
            },
            ClearAll: function () {
                $window.localStorage.clear();
                var cookies = $cookies.getAll();
                angular.forEach(cookies, function (v, k) {
                    $cookies.remove(k);
                });
            }
        };
    });
}());