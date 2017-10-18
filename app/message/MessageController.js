(function () {
    'use strict';
    angular.module("app").controller("MessageController", function ($scope, $state, API_URL, $rootScope, $uibModal, transproService, MessageService, fileUploadService, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg) {
        var vm = this;
        vm.model = {};
        var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
        vm.getdata = $state.params.modelData;
        Activate();
        function Activate() {
            if ($scope.CurrentUser.UserType == $scope.UserType.Customer) {
                vm.model.ReceiverID = vm.getdata.AssignedTranslatorID;
                vm.model.ReceiverName = vm.getdata.TranslatorNo;
                vm.model.SenderID = CurrentUser.ID;
                vm.model.SenderName = vm.getdata.ClientNo;
                vm.model.CreatedBy = $scope.UserType.Customer;
            }

            if ($scope.CurrentUser.UserType == $scope.UserType.Translator) {
                vm.model.ReceiverID = vm.getdata.ClientID;
                vm.model.ReceiverName = vm.getdata.ClientNo;
                vm.model.SenderID = CurrentUser.ID;
                vm.model.SenderName = vm.getdata.TranslatorNo;
                vm.model.CreatedBy = $scope.UserType.Translator;
            }

            //vm.model.ReceiverID = vm.getdata.AssignedTranslatorID;
            //vm.model.ReceiverName = vm.getdata.TranslatorName;
            //vm.model.SenderID = CurrentUser.ID;
            //vm.model.SenderName = CurrentUser.Name;
            vm.OrderNumber = vm.getdata.OrderNo;
            vm.model.OrderID = vm.getdata.ID;



            $scope.uploadFile = function () {
                if (vm.model.AttachedFile == null) {
                    return;
                }
                var url = API_URL.URL + "fileUpload/uploadDataFile";
                $scope.Variable.UploadReferenceState = 'Uploading....';
                fileUploadService.uploadFileToUrl(vm.model.AttachedFile, url, onSuccessUpload, onErrorUpload);
            }



            var onSuccessUpload = function (response) {
                vm.model.AttachedFile = response.data[0].FileName;
                vm.model.DownloadURL = response.data[0].DownloadURL;
                vm.model.AttachedSize = response.data[0].FileSize;
                //$scope.Estimation.ReferenceManual.CreatedDate = response.data[0].CreatedDate;
                //$scope.Estimation.ReferenceManual.Extension = response.data[0].Extension;
                //vm.Ref = 'Reference manual has been uploaded successfully';
            };
            var onErrorUpload = function (response) {
                alertMsg.show('error', "Error while uploading estimation document or manuscript : " + response);
            };



            $scope.SendMessage = function () {
                $scope.isTriedSave = true;
                if (!isValidInput())
                    return;
                MessageService.sendMessage(vm.model).then(onSuccessSend).catch(function (error) {
                }).catch(function (error) {
                    alertMsg.show('error', error);
                });
            }

            var onSuccessSend = function (response) {
                alertMsg.show('success', 'Your Message has been Send.');
                $state.go("sentmessage");
            };

            function isValidInput() {
                if (!vm.model.Title || vm.model.Title == "") {
                    return false;
                }
                if (!vm.model.Body || vm.model.Body == "") {
                    return false;
                }

                return true;
            }
        }
    });
})();