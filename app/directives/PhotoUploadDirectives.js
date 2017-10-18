angular.module("app").directive('loadPhoto', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        link: function ($scope, el, attrs, ngModel) {
            el.bind('change', function (event) {
                var files = event.target.files;
                var file = files[0];

                var reader = new FileReader();
                reader.onload = function (evt) {
                    ngModel.$setViewValue(null);
                    ngModel.$setViewValue(evt.target.result);       // Set model data to base64 encoded string of selected file
                    $scope.$apply();
                };
                reader.readAsDataURL(file);
            });
        }
    };
});