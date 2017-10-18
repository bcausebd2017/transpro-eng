

/* ******************************************************************************************************************
 * AngularJS 1.5 Directive for allowing file input field to set ng-model data to a list of selected files
 * Date             :   20-September-2017
 * By               :   Ashis Kr. Das
 * *****************************************************************************************************************/


angular.module("app").directive('loadFile', ['alertMsg', '$rootScope', function (alertMsg, $rootScope) {

    var ValidExtensionList = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'rtf', 'txt'];

    function GetFileNameExtension(File) {
        var Extension;
        Extension = File.name.substring(File.name.lastIndexOf('.') + 1).toLowerCase();
        return Extension;
    }

    return {
        require: "ngModel",
        restrict: 'A',
        link: function ($scope, el, attrs, ngModel) {
            el.bind('change', function (event) {

                var EnableMultiSelection = !(typeof attrs.multiple == 'undefined');
                var EnableDocumentFilter = !(typeof attrs.useDocumentFilter == 'undefined');
                var EnableBroadcasting = !(typeof attrs.broadcast == 'undefined');
                var FileList = event.target.files;
                var File, Extension;

                if (EnableMultiSelection == true) {
                    var i, InvalidExtension, Message;
                    if (EnableDocumentFilter == true) {
                        InvalidExtension = false;
                        for (i = 0; i < FileList.length; i += 1) {
                            Extension = GetFileNameExtension(FileList[i]);
                            if (ValidExtensionList.indexOf(Extension) == -1) {
                                InvalidExtension = true;
                                break;
                            }
                        }
                        if (InvalidExtension == true) {
                            if (FileList.length == 1) {
                                Message = Extension.toUpperCase().concat(" files are not allowed for upload. Please select a valid file type.");
                            }
                            else {
                                Message = 'One or more files have invalid format. Please make sure that the files you choose are on correct format.';
                            }
                            el.val(null);
                            ngModel.$setViewValue(null);
                            $scope.$apply();
                            if (EnableBroadcasting == true) $rootScope.$broadcast(attrs.broadcast, null);
                            alertMsg.show('error', Message);
                        }
                        else {
                            ngModel.$setViewValue(FileList);
                            $scope.$apply();
                            if (EnableBroadcasting == true) $rootScope.$broadcast(attrs.broadcast, FileList);
                        }
                    }
                    else if (EnableDocumentFilter == false) {
                        ngModel.$setViewValue(FileList);
                        $scope.$apply();
                        if (EnableBroadcasting == true) $rootScope.$broadcast(attrs.broadcast, FileList);
                    }
                }
                else if (EnableMultiSelection == false) {
                    File = FileList[0];
                    if (EnableDocumentFilter == false) {
                        ngModel.$setViewValue(FileList);
                        $scope.$apply();
                        if (EnableBroadcasting == true) $rootScope.$broadcast(attrs.broadcast, FileList);
                    }
                    else if (EnableDocumentFilter == true) {
                        Extension = GetFileNameExtension(File);
                        if (ValidExtensionList.indexOf(Extension) == -1) {
                            el.val(null);                                       // Clear File Address Text Box
                            ngModel.$setViewValue(null);                        // Model value should be cleared also
                            $scope.$apply();
                            if (EnableBroadcasting == true) $rootScope.$broadcast(attrs.broadcast, null);
                            alertMsg.show('error',
                                Extension.toUpperCase().concat(" files are not allowed for upload. Please select a valid file type"));
                        }
                        else {
                            ngModel.$setViewValue(FileList);
                            $scope.$apply();
                            if (EnableBroadcasting == true) $rootScope.$broadcast(attrs.broadcast, FileList);
                        }
                    }
                }
            });
        }
    };
}]);


