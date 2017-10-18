(function () {
    'use strict';
    angular.module("app").controller("translatorCoordinatorController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg, transproService, fileUploadService, API_URL) {

        var vm = this;
        var FileId = null;
        $scope.vm.WordCount1 = null;
        $scope.vm.WordCount2 = null,
        $scope.vm.WordCount3 = null;
        $scope.vm.Address = true;
        $scope.vm.IsAgree = false;
       
        var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);

        vm.onInit = function ()
        {
            $scope.vm.CurrentCulture = APP_SETTINGS.CultureCode;
            $scope.vm.ApplicationID = APP_SETTINGS.ApplicationId;
            $scope.vm = $state.params.modelData;
            getCountryList();
            getLanguageList();
            getEstimationTypeList();
        }


        var getCountryList = function () {

            transproService.getCountries().then(function (response) {
                $scope.countryList = angular.copy(response);

            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }

      var  getLanguageList =  function () {
            transproService.getLanguages().then(function (response) {
                $scope.languageList = angular.copy(response)

            }).catch(function (error) {
                alertMsg.show('error', error);
            });
      }

      var getEstimationTypeList = function()
      {
          transproService.getEstimationTypeList().then(function (response) {
              $scope.estimationTypeList = angular.copy(response)

          }).catch(function (error) {
              alertMsg.show('error', error);
          });
      }

      $scope.uploadFile =function(file, Id)
      {
          FileId = Id;
          if (file !== null ) {
             var url = API_URL.URL + "fileUpload/uploadDocument";
              fileUploadService.uploadFileToUrl(file, url, onSuccessUploadDocument, onError);
          }
      }
      var onSuccessUploadDocument = function (response) {

          if (FileId === 1)
          {
              vm.file1 = response.data[0].DownloadURL;
              vm.WordCount1 = response.data[0].WordCount;
              vm.fileSize1 = GetFileSize(response.data[0].FileSize);
              vm.FileName1 = response.data[0].FileName;

          }
          else if (FileId === 2)
          {
              vm.file2 = response.data[0].DownloadURL;
              vm.WordCount2 = response.data[0].WordCount;
              vm.fileSize2 = GetFileSize(response.data[0].FileSize);
              vm.FileName2 = response.data[0].FileName;
             
          }
          else if (FileId === 3) {
              vm.file3 = response.data[0].DownloadURL;
              vm.WordCount3 = response.data[0].WordCount;
              vm.fileSize3 = GetFileSize(response.data[0].FileSize);
              vm.FileName3 = response.data[0].FileName;
          }
        
      }
      
      var onError = function (response) {
          console.log("Error while uploading estimation document: " + response);
      };


      $scope.Delete = function(FileName, Id)
      {
          FileId = Id;
          var DeleteUrl = API_URL.URL + "fileUpload/DeleteDocument";
          fileUploadService.DeleteFile(DeleteUrl, FileName, onSuccessDelete, onError);
      }
      var onSuccessDelete = function(response)
      {
          if(FileId == 1)
          {
              vm.file1 = null;
              vm.WordCount1 =null;
              vm.fileSize1 = "";
          }
          else if (FileId == 2) {
              vm.file2 = null;
              vm.WordCount2 = null;
              vm.fileSize2 = "";
          }
          else if (FileId == 3) {
              vm.file3 = null;
              vm.WordCount3 = null;
              vm.fileSize3 = "";
          }
          alertMsg.show('success', response.data);
      }

      $scope.Submit = function(vm)
      {
          $scope.isTriedSave = true;
          //if (!FormValidation(vm))
          //    return;
          //vm.ClientID = CurrentUser.ID;
          if (vm.sourceLanguageID !== '' && vm.targetLanguageID !=='' && vm.ServiceTypeID !=='')
          {
              $scope.vm.sourceLanguage = _.find($scope.languageList, function (o) { return o.ID === vm.sourceLanguageID }).Name;
              $scope.vm.targetLanguage = _.find($scope.languageList, function (o) { return o.ID === vm.targetLanguageID }).Name;
              $scope.vm.Service = _.find($scope.estimationTypeList, function (o) { return o.ID === vm.ServiceTypeID }).Name;
          }
   

          $state.go("translatorCoordinatorEstimaton", { modelData: vm });
      }
    

      $scope.EstimationSubmit = function (vm)
      {
          transproService.saveEstimation(vm).then(function (response) {

              $state.go("translatorCoordinatorEstimaton");

          }).catch(function (error) {
              alertMsg.show('error', error);
          });

      }

      var FormValidation = function(vm)
      {
          if (vm.IsAgree !== true) {
              alertMsg.show('error', "Please Agree the terms and condition")
              return false;
          }
         if (!vm.BillingCompanyName || vm.BillingCompanyName == "" )
          {
              return false;
         }
         if (!vm.BillingTo || vm.BillingTo == "")
         {
             return false;
         }
         if (!vm.sourceLanguageID || vm.sourceLanguageID == "" || !vm.targetLanguageID || vm.targetLanguageID == "")
         {
             return false;
         }
         if (vm.targetLanguageID == vm.sourceLanguageID)
         {
             alertMsg.show('error', "Source and traget language can not be same")
             return false;
         }

              return true;
     
      }

      var GetFileSize = function (FileSize)
      {
          var  SizeUnit;
          var A_KB = 1024, A_MB = A_KB * 1024, A_GB = A_MB * 1024;

          if (FileSize >= A_GB) {
              FileSize /= A_GB;
              SizeUnit = "GB";
          }
          else if (FileSize >= A_MB) {
              FileSize /= A_MB;
              SizeUnit = "MB";
          }
          else if (FileSize >= A_KB) {
              FileSize /= A_KB;
              SizeUnit = "KB";
          }
          else {
              SizeUnit = "Bytes";
          }
          FileSize = Math.round(FileSize).toFixed(2) + " " + SizeUnit;

          return FileSize;
      }

    });
})();