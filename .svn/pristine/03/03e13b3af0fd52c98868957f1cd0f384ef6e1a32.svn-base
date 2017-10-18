

angular.module("app").service('fileUploadService', ['$http', '$rootScope', 'APP_SETTINGS',
    function ($http, $rootScope, APP_SETTINGS) {

        this.uploadFileToUrl = function (file, uploadUrl, successFunction, errorFunction) {

            if (typeof (file) == "undefined")
                return;
            if (file == null)
                return;

            var Data = new FormData();
            angular.forEach(file, function (value, key) {
                Data.append(key, value);
            });

            var config = {};
            config.method = "POST";
            config.url = uploadUrl;
            config.headers = { 'Content-Type': undefined };
            config.data = Data;
            config.params = { userID: 0, culture: APP_SETTINGS.CultureCode };
            $http(config).then(function (response) { successFunction(response); }, function (error) { errorFunction(error); });
        }

        this.DeleteFile = function (DeleteUrl, FileName, successFunction, errorFunction)
        {
            if (FileName == null)
                return;
            var Data = new FormData();
         
            var config = {};
            config.method = "POST";
            config.url = DeleteUrl;
            config.headers = { 'Content-Type': undefined };
            config.data = Data;
            config.params = { FileName: FileName };
            $http(config).then(function (response) { successFunction(response); }, function (error) { errorFunction(error); });
        }
    }
]);

