(function () {
    'use strict';

    function homeController($scope, $rootScope, $state, $uibModal, transproService, STORAGE_TYPE, appStorageFactory, USER_TYPE, API_URL, fileUploadService, APP_SETTINGS, alertMsg, TRANSLATION_TYPE, translatorService, MessageService, ORDER_STATUS, TransproUtilityService) {

        var vm = this;
        $scope.isProceedToEstimation = false;
        $scope.Estimation = {};
        $scope.Estimation.FileList = null;
        $scope.Estimation.FileSizeTotalString = null;
        $scope.Estimation.WordCount = 0;
        $scope.Estimation.DocumentList = null;
        $scope.Estimation.Manuscript = {};
        $scope.Estimation.Manuscript.WordCount = 0;
        $scope.Estimation.Manuscript.TranslationText = null;
        $scope.Estimation.Manuscript.InputText = null;
        $scope.CurrentUser = null;
        
        $scope.Variable = {};
        $scope.Variable.selectField = '';
        $scope.Variable.UploadStatus = '';
        $scope.Variable.srcLanguage = '';
        $scope.Variable.destLanguage = '';
        $scope.Variable.selectField = '';
        $scope.Variable.srcSearchLanguage = '';
        $scope.Variable.destSearchLanguage = '';
        $scope.Variable.selectSearchField = '';
        $scope.OrderStatus = ORDER_STATUS;
        $scope.currentPage = 1;
        $scope.numPerPage = 18;
        $scope.totalTranslators = null;
        $scope.totalOrders = null;
        $scope.translators = null;
        $scope.orders = null;
        $scope.numPerPageOrders = 26;
        $scope.advertise = [];
        $scope.Estimation.TranslationType;

        var StateName = $state.current.name;
        if (StateName == "onlineTranslation" || StateName == "/") {
            $scope.Estimation.TranslationType = TRANSLATION_TYPE.Online;
        }
        else if (StateName == "appointedTranslation") {
            $scope.Estimation.TranslationType = TRANSLATION_TYPE.Appointed;
        }
        else if (StateName == "nativeCheck") {
            $scope.Estimation.TranslationType = TRANSLATION_TYPE.NativeCheck;
        }

        Activate();

        function Activate() {           
            $scope.Variable.selectLanguage = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            $scope.UserType = USER_TYPE;
            getLanguages();
            getTranslationFields();
            transproService.getadvertisement().then(function (response) {
                $scope.advertise = response;
                var FilteredAdvertise = [];
                var i;
                var Today = (new Date()).getTime();
                var Millis;
                for (i = 0; i < $scope.advertise.length; i += 1) {
                    if ($scope.advertise[i].ValidDateTime != null) {
                        Millis = (new Date($scope.advertise[i].ValidDateTime)).getTime();
                        if (Millis >= Today) {
                            FilteredAdvertise.push($scope.advertise[i]);
                        }
                    }
                }
                $scope.advertise = FilteredAdvertise;
            }).catch(function (error) {
                //alertMsg.show('error', error);
            });
        }

        function getLanguages() {
            
            transproService.getLanguages().then(function (response) {
                $scope.Variable.languages = [];
                $scope.Variable.languagesTarget = [];
                $scope.Variable.languages = response;
                $scope.Variable.srcLanguage = _.find($scope.Variable.languages, function (f) { return f.Code == 'eng' }).ID;

                var currentState = $state.current.name;
                if (currentState === 'nativeCheck') {
                    $scope.Variable.selectLanguage = "";
                    transproService.getLanguages(true).then(function (response) {
                        $scope.Variable.languagesTarget = response;
                        $scope.Variable.destLanguage = _.find($scope.Variable.languagesTarget, function (f) { return f.Code == 'ntv' }).ID;
                        $scope.Variable.languageName = _.find($scope.Variable.languagesTarget, function (f) { return f.ID == $scope.Variable.destLanguage }).Name;
                        $scope.Variable.srcSearchLanguage = $scope.Variable.srcLanguage;
                        $scope.Variable.destSearchLanguage = $scope.Variable.destLanguage;
                    })
                    .catch(function (error) { });
                }
                else {
                    //$scope.Variable.languagesTarget = $scope.Variable.languages;
                    //if (!$scope.Variable.selectLanguage)
                    //    $scope.Variable.destLanguage = _.find($scope.Variable.languagesTarget, function (f) { return f.Code == 'jpn' }).ID;
                    //else
                    //    $scope.Variable.destLanguage = $scope.Variable.selectLanguage;
                    //$scope.Variable.languageName = _.find($scope.Variable.languages, function (f) { return f.ID == $scope.Variable.destLanguage }).Name;
                    //$scope.Variable.srcSearchLanguage = $scope.Variable.srcLanguage;
                    //$scope.Variable.destSearchLanguage = $scope.Variable.destLanguage;
                    transproService.getTargetLanguageList($scope.Variable.srcLanguage, true).then(function (response) {
                        $scope.Variable.languagesTarget = response;
                        if (response.length > 0) {
                            $scope.Variable.destLanguage = response[0].ID;
                        }
                        else {
                            $scope.Variable.destLanguage = '';
                        }
                    }).catch(function (error) {
                        console.log("Error on getting target language list");
                    });
                }
            }).catch(function (error) {
                //alertMsg.show('error', error);
            });
        }
        function getWebOrders(srcLangId, trgLangId, specialFieldId, translationType) {
            var clientId = $scope.CurrentUser && $scope.CurrentUser.UserType == USER_TYPE.Customer ? $scope.CurrentUser.ID : null;
            var trnslatorId = $scope.CurrentUser && $scope.CurrentUser.UserType == USER_TYPE.Translator ? $scope.CurrentUser.ID : null;
            var filterModel = { cultureId: APP_SETTINGS.CultureCode, clientId: clientId, translationType: $scope.Estimation.TranslationType, srcLangId: srcLangId, trgLangId: trgLangId, specialFieldId: specialFieldId }
            transproService.getWebOrders(filterModel).then(function (response) {
                $scope.orders = response;
                $scope.totalOrders = response.length;
                $scope.filterOrders = response;
                if ($scope.totalOrders > $scope.numPerPageOrders)
                $scope.doCtrlPagingOrders(1);
            }).catch(function (error) {
                $scope.orders = [];
                //alertMsg.show('error', error);
            });
        }
        function getTranslationFields() {
            transproService.getTranslationFileds().then(function (response) {
                $scope.translationFields = response;
                getWebOrders(null, null, null);
                searchTranslators(null, null, null);
            }).catch(function (error) {
               // alertMsg.show('error', error);
            });
        }
        function searchTranslators(srcLangId, trgLangId, specialFieldId) {
            translatorService.searchTranslator(srcLangId, trgLangId, specialFieldId).then(function (response) {
                $scope.translators = response;
                $scope.totalTranslators = response.length;
                $scope.filterTranslators = response;
                if ($scope.totalTranslators > $scope.numPerPage)
                 $scope.doCtrlPagingAct(1);
            }).catch(function (error) {
              
            });
        }
       
        $scope.srcLangChanged = function (lang) {
            $scope.Variable.srcLanguage = lang;
            transproService.getTargetLanguageList($scope.Variable.srcLanguage, true).then(function (response) {
                $scope.Variable.languagesTarget = response;
                if (response.length > 0) {
                    $scope.Variable.destLanguage = response[0].ID;
                }
                else {
                    $scope.Variable.destLanguage = '';
                }
            }).catch(function (error) {
                console.log("Error on getting target language list");
            });
        };
        $scope.destLangChanged = function (lang) {
            $scope.Variable.destLanguage = lang;
        };
        $scope.selectLangChanged = function (lang) {          
            $rootScope.$broadcast('targetLanguageChanged', lang);
            getWebOrders(null,null,null);
            searchTranslators(null, $scope.Variable.destLanguage, null);
        };
        $scope.goHome = function () {
            getWebOrders(null,null,null);
            searchTranslators(null, null, null);
        }
        $scope.$on('targetLanguageChanged', function (event, data) {
            if (data && data != "") {
                $scope.Variable.destLanguage = "";
                var currentState = $state.current.name;
                if (currentState === 'nativeCheck') {
                    $scope.Variable.destLanguage = "";
                } else {
                    $scope.Variable.destLanguage = data;
                }
                $scope.Variable.languageName = _.find($scope.Variable.languagesTarget, function (f) { return f.ID == data }).Name;
                $scope.Variable.selectLanguage = data;
                appStorageFactory.SetStorageObject("SetTargetLang", data);
                $scope.Variable.destLanguage = data;
            }
        });

        $scope.fieldChanged = function (field) {
            $scope.Variable.selectField = field;
            $scope.isProceedToEstimation = false;
        };
        $scope.ClearFileSelector = function () {
            var elem = angular.element(document.querySelector("#fileName"));
            elem.val(null);
            $scope.Estimation.FileList = null;
            $scope.Estimation.WordCount = 0;
            $scope.Estimation.DocumentList = null;
        };

        $scope.logout = function () {
            $state.reload();
            $scope.CurrentUser = "";
            $state.go('/', { modelData: undefined });
            //$state.go('/');
            appStorageFactory.ClearAll();
        };
        $scope.getUserById = function () {
            if ($scope.CurrentUser.UserType == USER_TYPE.Customer) {
                transproService.getCustomerById($scope.CurrentUser.ID, APP_SETTINGS.CultureCode).then(function (response) {
                    $scope.modifyData = response;
                    $state.go('registration', { modelData: response });
                }).catch(function (error) {
                    alertMsg.show('error', error);
                });
            }

            if ($scope.CurrentUser.UserType == USER_TYPE.Translator) {
                transproService.getTranslatorById($scope.CurrentUser.ID, APP_SETTINGS.CultureCode).then(function (response) {
                    $scope.modifyData = response;
                    $state.go('translatorReg', { "modelData": response });
                }).catch(function (error) {
                    toastr.error(error);
                });
            }
        };
      
        $scope.getImageById = function () {
            transproService.getImageById($scope.CurrentUser.ID, APP_SETTINGS.CultureCode).then(function (response) {
                //$scope.modifyData = response.Image;
                $scope.modifyData = response;
                $state.go('changePhoto', { "modelData": response });
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        };
        $scope.getReceiveMsgById = function () {
            MessageService.getReceiveMsgById($scope.CurrentUser.ID).then(function (response) {
                $scope.modifyData = response;
                $state.go('receivemessage', { "modelData": response });
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        };

        $scope.getSendMsgById = function () {
            MessageService.getSendMsgById($scope.CurrentUser.ID).then(function (response) {
                $scope.modifyData = response;
                $state.go('sentmessage', { "modelData": response });
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        };

        $scope.open = function (type) {
            $uibModal.open({
                component: "loginWindow",
                transclude: true,
                backdrop: 'static',
                keyboard: false,
                resolve: { },
                size: 'sm'
            });
        };
        $scope.openTranslatorWindow = function (translator) {
            $uibModal.open({
                component: "translatorProfileWindow",
                transclude: true,
                animation:true,
                resolve: {
                    translatorNo: function () {
                        return  translator.TranslatorNo;
                    }
                },
                size: 'lg',
            });
        };

        $scope.UpdateFileInfo = function () {
            var i, FileSize;
            var BinaryFileSize = 0;
            for (i = 0; i < $scope.Estimation.FileList.length; i += 1) {
                BinaryFileSize += $scope.Estimation.FileList[i].size;
            }
            $scope.Estimation.FileSizeTotalString = TransproUtilityService.GetHumanReadableFileSizeInfo(BinaryFileSize);
        };

        $scope.$on('listenTranslationFileSelection', function (event, data) {
            $scope.Estimation.WordCount = 0;
            $scope.Estimation.DocumentList = [];
        });


        $scope.UploadTranslationDocuments = function () {
            var HasDocumentSelected;
            $scope.Estimation.WordCount = 0;
            $scope.Estimation.DocumentList = [];
            HasDocumentSelected = $scope.Estimation.FileList != null;
            if (HasDocumentSelected == true) {
                $scope.Variable.UploadStatus = "Uploading...";
                var url = API_URL.URL + "fileUpload/uploadDocument";
                fileUploadService.uploadFileToUrl($scope.Estimation.FileList, url, onSuccessUploadDocument, onError);
            }
        };

        $scope.CheckEstimation = function () {
            var HasManuscriptData;
            $scope.isProceedToEstimation = true;
            HasManuscriptData = $scope.Estimation.Manuscript.InputText != null && $scope.Estimation.Manuscript.InputText.length > 0;

            if ($scope.Variable.srcLanguage == '' || $scope.Variable.destLanguage == '' || $scope.Variable.selectField == ''
                || $scope.Variable.selectField == null) {
                alertMsg.show('error', "Please choose your source language, target language & translation field to proceed to the next step.");
                return;
            }

            $scope.Estimation.srcLanguage = $scope.Variable.srcLanguage;
            $scope.Estimation.destLanguage = $scope.Variable.destLanguage;
            $scope.Estimation.selectField = $scope.Variable.selectField;

            if (HasManuscriptData == true) {
                var url = API_URL.URL + "transpro/estimatemanuscript";
                transproService.EstimateManuscript($scope.Estimation.Manuscript.InputText)
                .then(onSuccessUploadManuscript, function (error) { });
            }
            else if ($scope.Estimation.DocumentList != null && $scope.Estimation.DocumentList.length > 0) {
                $state.go("estimation", { "Estimation": $scope.Estimation });
            }
            else {
                alertMsg.show('error', 'Please choose either manuscript OR upload documents to translate OR both option.');
            }

            return;
        };
        var onSuccessUploadDocument = function (response) {
            var HasManuscriptData;
            var i, Document;
            $scope.Estimation.WordCount = 0;
            for (i = 0; i < response.data.length; i += 1) {
                Document = new Object();
                Document.FileName = response.data[i].FileName;
                Document.OriginalFileName = response.data[i].OriginalFileName;
                Document.WordCount = response.data[i].WordCount;
                Document.TranslationText = response.data[i].TranslationText;
                Document.DownloadURL = response.data[i].DownloadURL;
                Document.FileSize = response.data[i].FileSize;
                Document.UploadDate = new Date(response.data[i].UploadDate);
                Document.Extension = response.data[i].Extension;
                Document.HumanReadableFileSize = TransproUtilityService.GetHumanReadableFileSizeInfo(Document.FileSize);
                $scope.Estimation.DocumentList.push(Document);
                $scope.Estimation.WordCount += Document.WordCount;
            }
            $scope.Variable.UploadStatus = "Translation documents have been uploaded successfully";
        };

        var onSuccessUploadManuscript = function (response) {
            $scope.Estimation.Manuscript.WordCount = response.WordCount;
            $scope.Estimation.WordCount += $scope.Estimation.Manuscript.WordCount;
            $scope.Estimation.Manuscript.TranslationText = response.TranslationText;
            $scope.Estimation.srcLanguage = $scope.Variable.srcLanguage;
            $scope.Estimation.destLanguage = $scope.Variable.destLanguage;
            $scope.Estimation.selectField = $scope.Variable.selectField;
            $state.go("estimation", { Estimation: $scope.Estimation });
        };

        var onError = function (response) {
            console.log("Error while uploading estimation document: " + response);
        };
        // Orders paginations

        $scope.RedirectToSearchTranslator = function () {
            var SearchTranslatorData = {};
            SearchTranslatorData.srcSearchLanguage = $scope.Variable.srcSearchLanguage;
            SearchTranslatorData.destSearchLanguage = $scope.Variable.destSearchLanguage;
            SearchTranslatorData.selectSearchField = $scope.Variable.selectSearchField;
            $state.go("translator", { SearchTranslatorData: SearchTranslatorData });
        };

        $scope.doCtrlPagingOrders = function (page) {

            var begin = ((page - 1) * $scope.numPerPageOrders);
            var end = begin + $scope.numPerPageOrders;

            $scope.filterOrders = $scope.orders.slice(begin, end);
        };
      
        // Translators Pagination

        $scope.doCtrlPagingAct = function (page) {

            var begin = ((page - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;

            $scope.filterTranslators = $scope.translators.slice(begin, end);
        };
       
    }

    angular
       .module("app")
       .controller("homeController", homeController);
  
    homeController.$inject = ["$scope", "$rootScope", "$state", "$uibModal", "transproService", "STORAGE_TYPE", "appStorageFactory", "USER_TYPE", "API_URL", "fileUploadService", "APP_SETTINGS","alertMsg", "TRANSLATION_TYPE", "translatorService","MessageService", "ORDER_STATUS", "TransproUtilityService"];

})();