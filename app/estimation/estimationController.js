(function () {
    'use strict';

    function estimationController($http,
        $scope, $state, $uibModal, transproService, STORAGE_TYPE,
        appStorageFactory, USER_TYPE, API_URL, $stateParams, APP_SETTINGS, DELIVERY_TIMERANGE_TYPE, PRICE_DETAILS_TYPE,
        alertMsg, fileUploadService, $anchorScroll, $location, translatorService, TRANSLATION_TYPE, ORDER_STATUS,
        PAYMENT_STATUS, PAYMENT_METHOD, TransproUtilityService) {

        var vm = this;

        $scope.CurrentUser = null;
        $scope.Variable = {};
        $scope.Variable.DeliveryPriority = null;
        $scope.Variable.AgreeEstimation = false;
        $scope.Variable.WaitingForClientLogin = false;
        $scope.Variable.IsPriceListAvailable = false;
        $scope.Variable.progress = 0;

        $scope.currentPage = 1
        $scope.numPerPage = 12
        $scope.TranslatorList = [];
        $scope.PRICE_DETAILS_TYPE = PRICE_DETAILS_TYPE;

        $scope.GetDeliveryPlanClass = function (PriceDetails) {
            var dclass = '';
            if ($scope.Estimation.PriceDetails == PriceDetails) {
                switch ($scope.Estimation.PriceType) {
                    case PRICE_DETAILS_TYPE.LightPrice:
                        dclass = 'active_plan_light';
                        break;
                    case PRICE_DETAILS_TYPE.BusinessPrice:
                        dclass = 'active_plan_business';
                        break;
                    case PRICE_DETAILS_TYPE.ExpertPrice:
                        dclass = 'active_plan_expert';
                }
            }
            return dclass;
        };
        $scope.GetPriceButtonClass = function (PriceDetails, PriceType) {
            var part1 = 'b_button ';
            var part2 = ' b_small';
            var middlePart = 'b_grey';
            if ($scope.Estimation.PriceDetails == PriceDetails && $scope.Estimation.PriceType == PriceType) {
                switch (PriceType) {
                    case PRICE_DETAILS_TYPE.LightPrice:
                        middlePart = 'b_green';
                        break;
                    case PRICE_DETAILS_TYPE.BusinessPrice:
                        middlePart = 'b_blue';
                        break;
                    case PRICE_DETAILS_TYPE.ExpertPrice:
                        middlePart = 'b_purple';
                }
            }
            return (part1 + middlePart + part2);
        };
        $scope.GetPlanHeadingClass = function (PriceType) {
            var part1 = 'plan-heading ';
            var part2;
            switch (PriceType) {
                case PRICE_DETAILS_TYPE.LightPrice:
                    part2 = $scope.Estimation.PriceType == PriceType ? 'plan_light_bg_active' : 'plan_light_bg'
                    break;
                case PRICE_DETAILS_TYPE.BusinessPrice:
                    part2 = $scope.Estimation.PriceType == PriceType ? 'plan_business_bg_active' : 'plan_business_bg';
                    break;
                case PRICE_DETAILS_TYPE.ExpertPrice:
                    part2 = $scope.Estimation.PriceType == PriceType ? 'plan_expert_bg_active' : 'plan_expert_bg';
            }
            return (part1 + part2);
        };



        $scope.getTransproLanguagePriceCategory = function () {
            $scope.Variable.IsPriceListAvailable = false;
            if ($scope.Estimation.selectField == "" || $scope.Estimation.selectField == null
                || $scope.Estimation.srcLanguage == "" || $scope.Estimation.srcLanguage == null
                || $scope.Estimation.destLanguage == "" || $scope.Estimation.destLanguage == null) {
                $scope.LanguagePriceCategoryList = [];
                $scope.Estimation.DeliveryAnticipatedDate = null;
                $scope.Estimation.PriceType = null;
                $scope.Estimation.Price = null;
                return;
            }
            var TransproModel = {};
            TransproModel.CurrentCulture = APP_SETTINGS.CultureCode;
            TransproModel.SourceLanguageID = $scope.Estimation.srcLanguage;
            TransproModel.TargetLanguageID = $scope.Estimation.destLanguage;
            TransproModel.SpecialityFieldID = $scope.Estimation.selectField;
            transproService.getTransproLanguagePriceCategory(TransproModel).then(function (response) {

                $scope.LanguagePriceCategoryList = response;
                if ($scope.LanguagePriceCategoryList.length && $scope.LanguagePriceCategoryList.length > 0) {
                    if ($scope.LanguagePriceCategoryList[0].PriceDetailsList && $scope.LanguagePriceCategoryList[0].PriceDetailsList.length > 0) {
                        var Logic, PriceCategory;
                        PriceCategory = $scope.LanguagePriceCategoryList[0];
                        Logic = PriceCategory.IsLightPrice || PriceCategory.IsBusinessPrice || PriceCategory.IsExpertPrice;
                        $scope.Variable.IsPriceListAvailable = Logic;
                    }
                }
                if ($scope.Variable.IsPriceListAvailable == false) {
                    $scope.Estimation.DeliveryAnticipatedDate = null;
                    $scope.Estimation.PriceType = null;
                    $scope.Estimation.Price = null;
                    $scope.Estimation.PriceDetails = null;
                    $scope.Estimation.Tax = null;
                    $scope.Estimation.PriceWithTax = null;
                    return;
                }
                var PriceDetails = response[0].PriceDetailsList[0];
                if (response[0].IsBusinessPrice == true) {
                    $scope.Variable.DeliveryPriority = 2;
                    $scope.Estimation.PriceType = 2;
                    $scope.Estimation.Price = response[0].PriceDetailsList[0].BusinessPrice * $scope.Estimation.WordCount;
                }
                else if (response[0].IsLightPrice == true) {
                    $scope.Estimation.PriceType = 1;
                    $scope.Variable.DeliveryPriority = 1;
                    $scope.Estimation.Price = response[0].PriceDetailsList[0].LightPrice * $scope.Estimation.WordCount;
                }
                else if (response[0].IsExpertPrice == true) {
                    $scope.Estimation.PriceType = 3;
                    $scope.Variable.DeliveryPriority = 3;
                    $scope.Estimation.Price = response[0].PriceDetailsList[0].ExpertPrice * $scope.Estimation.WordCount;
                }
                $scope.Estimation.Tax = $scope.Estimation.Price * 0.1;
                $scope.Estimation.PriceWithTax = $scope.Estimation.Tax + $scope.Estimation.Price;
                $scope.Estimation.PriceDetails = response[0].PriceDetailsList[0];
                CalculateAnticipatedDate();
            }).catch(function (error) { });
        };

        Activate();

        function Activate() {
            $scope.CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            $scope.UserType = USER_TYPE;
            $scope.selectTargetlang = appStorageFactory.GetStorageObject(STORAGE_TYPE.SetTargetLang);
            
            $scope.Estimation = $stateParams.Estimation;
            $scope.Estimation.Status = null;
            $scope.Estimation.Price = null;
            $scope.Estimation.Tax = null;
            $scope.Estimation.PriceWithTax = null;
            $scope.Estimation.PriceType = 0;
            $scope.Estimation.PriceDetails = null;
            $scope.Estimation.DeliveryAnticipatedDate = null;
            $scope.Estimation.ReferenceManual = {};
            $scope.Estimation.ReferenceManual.IsUploaded = false;
            $scope.Estimation.ReferenceManual.File = null;
            $scope.Estimation.ReferenceManual.Name = null;
            $scope.Estimation.ReferenceManual.OriginalFileName = null;
            $scope.Estimation.ReferenceManual.DownloadURL = null;
            $scope.Estimation.ReferenceManual.Size = null;
            $scope.Estimation.ReferenceManual.HumanReadableFileSize = null;
            $scope.Estimation.ReferenceManual.CreatedDate = null;
            $scope.Estimation.ReferenceManual.Extension = null;
            $scope.Estimation.CommentForTranslators = null;
            $scope.Estimation.AppointedTranslation = $scope.Estimation.TranslationType == TRANSLATION_TYPE.Appointed ? true : false;
            $scope.Estimation.AppointedTranslators = [];

            getLanguages();
            getTranslationFields();
            GetSubSpecialityFields();

            $scope.getTransproLanguagePriceCategory();
            if ($scope.Estimation.DocumentList != null) {
                var i, ext, type;
                for (i = 0; i < $scope.Estimation.DocumentList.length; i += 1) {
                    ext = $scope.Estimation.DocumentList[i].Extension.toLowerCase();
                    ext = ext.substring(1, ext.length);
                    switch (ext) {
                        case "doc", "docx":
                            type = "word";
                            break;
                        case "xls", "xlsx":
                            type = "excel";
                            break;
                        case "ppt", "pptx":
                            type = "ppt";
                            break;
                        default:
                            type = ext;
                    }
                    $scope.Estimation.DocumentList[i].IconClass = type;
                }
            }
        }

        function getLanguages() {
            var IsNativeCheck = false;
            IsNativeCheck = $scope.Estimation.TranslationType == TRANSLATION_TYPE.NativeCheck;
            transproService.getLanguages().then(function (response) {
                $scope.Variable.languages = response;
            }).catch(function (error) { });
            transproService.getTargetLanguageList(IsNativeCheck).then(function (response) {
                $scope.Variable.languagesTarget = response;
            }).catch(function (error) {
                console.log("Error while loading Target language list.");
            });
        }

        function getTranslationFields() {
            transproService.getTranslationFileds().then(function (response) {
                $scope.Variable.translationFields = response;
                searchTranslators("0", "0", "0");
            }).catch(function (error) {});
        }

        function GetSubSpecialityFields() {
            transproService.GetSubSpecialityFields().then(function (response) {
                $scope.SubSpecialityList = response;
            }).catch(function (error) { });
        }

        function searchTranslators(srcLangId, trgLangId, specialFieldId) {
            translatorService.searchTranslator(srcLangId, trgLangId, specialFieldId).then(function (response) {
                $scope.TranslatorList = response;
                $scope.filterTranslators = response;
                var i;
                for (i = 0; i < $scope.TranslatorList.length; i += 1) {
                    $scope.TranslatorList[i].disabled = false;
                }
                if ($scope.TranslatorList.length > $scope.numPerPage)
                $scope.doCtrlPagingTranslators(1);
            }).catch(function (error) { });
        }

        $scope.CalculateExactPrices = function (PriceDetails, type) {
            var WordCount = $scope.Estimation.WordCount;
            $scope.Estimation.PriceType = type;
            $scope.Estimation.PriceDetails = PriceDetails;
            switch (type) {
                case PRICE_DETAILS_TYPE.LightPrice:
                    $scope.Estimation.Price = PriceDetails.LightPrice * WordCount;
                    break;
                case PRICE_DETAILS_TYPE.BusinessPrice:
                    $scope.Estimation.Price = PriceDetails.BusinessPrice * WordCount;
                    break;
                case PRICE_DETAILS_TYPE.ExpertPrice:
                    $scope.Estimation.Price = PriceDetails.ExpertPrice * WordCount;
                    break;
            }
            $scope.Estimation.Tax = $scope.Estimation.Price * 0.1;
            $scope.Estimation.PriceWithTax = $scope.Estimation.Tax + $scope.Estimation.Price;
            CalculateAnticipatedDate();
            return;
        };

        function CalculateAnticipatedDate() {
            var DeliveryType = $scope.Estimation.PriceDetails.DeliveryPlanType;
            var DeliveryTime = $scope.Estimation.PriceDetails.DeliveryPlanTime;
            var AnticipatedDate = TransproUtilityService.UpdateOrderAnticipatedDelivery(DeliveryTime, DeliveryType);
            $scope.Estimation.DeliveryAnticipatedDate = AnticipatedDate;
            return;
        }

        $scope.status = 0;

        $scope.DeleteReferenceManual = function () {
            var FileSelector = angular.element(document.querySelector("#manualUpload"));
            FileSelector.val(null);
            $scope.Estimation.ReferenceManual.File = null;
            $scope.Estimation.ReferenceManual.IsUploaded = false;
            $scope.Variable.progress = 0;
        };

        $scope.UploadReferenceManual = function () {
            $scope.status = 0;
            if ($scope.Estimation.ReferenceManual.File == null) {
                return;
            }
            var url = API_URL.URL + "fileUpload/uploadDataFile";
            $scope.Variable.progress = (Math.floor((Math.random() * Math.random() * 55.55) + 1) * 7) % 100;
            console.log($scope.Variable.progress);
            fileUploadService.uploadFileToUrl($scope.Estimation.ReferenceManual.File, url, onSuccessUpload, onErrorUpload);
        };
        var onSuccessUpload = function (response) {
            $scope.Variable.progress = 100;
            $scope.Estimation.ReferenceManual.IsUploaded = true;
            $scope.Estimation.ReferenceManual.Name = response.data[0].FileName;
            $scope.Estimation.ReferenceManual.OriginalFileName = response.data[0].OriginalFileName;
            $scope.Estimation.ReferenceManual.DownloadURL = response.data[0].DownloadURL;
            $scope.Estimation.ReferenceManual.Size = response.data[0].FileSize;
            $scope.Estimation.ReferenceManual.HumanReadableFileSize = TransproUtilityService.GetHumanReadableFileSizeInfo(response.data[0].FileSize);
            $scope.Estimation.ReferenceManual.CreatedDate = response.data[0].CreatedDate;
            $scope.Estimation.ReferenceManual.Extension = response.data[0].Extension;
        };
        var onErrorUpload = function (response) {
            alertMsg.show('error', "Error while uploading estimation document or manuscript : " + response);
        };

        $scope.EstimateTranslation = function () {
            if ($scope.Variable.AgreeEstimation == false) {
                alertMsg.show("alert", "Please agree with our terms and conditions to proceed.");
            }
            else {
                $scope.Estimation.Status = 1;
                //$location.hash('StartingDiv');
                $anchorScroll();
            }
        };

        $scope.ModifyEstimation = function () {
            $scope.Estimation.Status = null;
            //$location.hash('StartingDiv');
            $anchorScroll();
        };

        $scope.downloadFile = function () {
            var url;
            url = API_URL.URL + "DownloadFile/DataFiles/";
            url = url.concat($scope.Estimation.ReferenceManual.OriginalFileName);
            url = url + '/';
            url = url.concat($scope.Estimation.ReferenceManual.Name);
            window.open(url, '_blank', '');
        };

        $scope.RedirectToPayScreen = function () {
            var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
            var i;
            var Order = new Object();
            Order.ApplicationId = APP_SETTINGS.ApplicationId;
            Order.CurrentCulture = APP_SETTINGS.CultureCode;
            Order.SourceLanguageID = $scope.Estimation.srcLanguage;
            Order.TargetLanguageID = $scope.Estimation.destLanguage;
            Order.TranslationFieldID = $scope.Estimation.selectField;
            Order.AssignedTranslatorID = null;
            Order.DeliveryPlanID = $scope.Estimation.PriceDetails.DeliveryPlanID;
            Order.DeliveryPlan = $scope.Estimation.PriceDetails.DeliveryPlanName;

            switch ($scope.Estimation.PriceType) {
                case 1:
                    Order.DeliveryLevelName = "Light";
                    Order.UnitPrice = $scope.Estimation.PriceDetails.LightPrice;
                    break;
                case 2:
                    Order.DeliveryLevelName = "Business";
                    Order.UnitPrice = $scope.Estimation.PriceDetails.BusinessPrice;
                    break;
                case 3:
                    Order.DeliveryLevelName = "Expert";
                    Order.UnitPrice = $scope.Estimation.PriceDetails.ExpertPrice;
                    break;
            }
            Order.CurrencyID = $scope.LanguagePriceCategoryList[0].CurrencyID;
            Order.IntroducerID = null;

            var i;
            for (i = 0; i < $scope.Variable.languages.length; i += 1) {
                if ($scope.Variable.languages[i].ID == Order.TargetLanguageID) {
                    if ($scope.Variable.languages[i].Code == 'ntv') {
                        Order.TranslationType = TRANSLATION_TYPE.NativeCheck;
                    }
                    else {
                        if ($scope.Estimation.AppointedTranslation == true) {
                            Order.TranslationType = TRANSLATION_TYPE.Appointed;
                        }
                        else {
                            Order.TranslationType = $scope.Estimation.TranslationType;
                        }
                    }
                    break;
                }
            }
            console.log("Translation Type: " + Order.TranslationType);
            
            Order.OrderDate = new Date();
            Order.StartDate = null;
            Order.EndDate = null;
            Order.DeliveryDate = $scope.Estimation.DeliveryAnticipatedDate;
            Order.CompletionDate = null;
            Order.OrderStatus = ORDER_STATUS.WaitingForConfirmation;
            Order.PaymentStatus = PAYMENT_STATUS.Unpaid;
            Order.PaymentMethod = PAYMENT_METHOD.RequestedPayment;
            Order.WordCount = $scope.Estimation.WordCount;
            Order.PaymentAmount = $scope.Estimation.PriceWithTax;
            Order.TranslatorFee = null;
            Order.EstimatedPrice = $scope.Estimation.Price;
            Order.Discount = 0;
            Order.PriceAfterDiscount = Order.PaymentAmount;
            Order.ConsumptionTax = $scope.Estimation.Tax;
            Order.RequestDate = null;
            Order.CommentToTranslator = $scope.Estimation.CommentForTranslators;
            Order.MenuScript = $scope.Estimation.Manuscript.TranslationText;
            Order.DeliveryComment = null;
            Order.CompanyNotes = null;
            Order.CommentToBcause = null;
            Order.ReferenceFileName = $scope.Estimation.ReferenceManual.IsUploaded ? $scope.Estimation.ReferenceManual.Name : null;
            Order.ReferenceDownloadURL = $scope.Estimation.ReferenceManual.IsUploaded ? $scope.Estimation.ReferenceManual.DownloadURL : null;
            Order.ReferenceOriginalFileName = $scope.Estimation.ReferenceManual.IsUploaded ? $scope.Estimation.ReferenceManual.OriginalFileName : null;
            Order.ReferenceFileSize = $scope.Estimation.ReferenceManual.IsUploaded ? $scope.Estimation.ReferenceManual.Size : null;
            Order.WebDocumentList = new Array();
            if ($scope.Estimation.DocumentList != null) {
                var WebDocument;
                for (i = 0; i < $scope.Estimation.DocumentList.length; i += 1) {
                    WebDocument = new Object();
                    WebDocument.FileName = $scope.Estimation.DocumentList[i].FileName;
                    WebDocument.DownloadURL = $scope.Estimation.DocumentList[i].DownloadURL;
                    WebDocument.UploadDate = $scope.Estimation.DocumentList[i].UploadDate;
                    WebDocument.OriginalFileName = $scope.Estimation.DocumentList[i].OriginalFileName;
                    WebDocument.WordCount = $scope.Estimation.DocumentList[i].WordCount;
                    WebDocument.FileSize = $scope.Estimation.DocumentList[i].FileSize;
                    WebDocument.Extension = $scope.Estimation.DocumentList[i].Extension;
                    Order.WebDocumentList.push(WebDocument);
                }
            }
            $scope.Order = Order;

            if (CurrentUser && CurrentUser.UserType == USER_TYPE.Customer) {
                $scope.Order.ClientID = CurrentUser.ID;
                transproService.SaveOrderWeb($scope.Order).then(function (response) {
                    var OrderFilter = {};
                    OrderFilter.OrderNo = response;
                    OrderFilter.cultureId = APP_SETTINGS.CultureCode;
                    OrderFilter.ApplicationId = APP_SETTINGS.ApplicationId;
                    var config = {};
                    config.url = API_URL.URL + "order/getWebOrders";
                    config.method = "POST";
                    config.data = OrderFilter;
                    $http(config).then(function (response) {
                        $state.go("payment", { Order: response.data[0] }, { reload: true });
                    }, function (error) {
                        alertMsg.show("error", "An error occured while retriving stored order data.");
                        console.log("Error occured while retriving saved order");
                    });
                })
                .catch(function (error) {
                    console.log("Error occured while generating order data: " + error);
                });
            }
            else {
                $scope.Variable.WaitingForClientLogin = true;
                var config = {};
                config.component = "loginWindow";
                config.transclude = true;
                config.resolve = {};
                config.resolve.modalData = {};
                config.resolve.modalData.BroadcastSuccessLoginAddress = "LoginPerformed";
                config.resolve.modalData.BroadcastErrorLoginAddress = "ErronOnLogin";
                config.resolve.modalData.LoginForCustomer = true;
                config.size = "sm";
                $uibModal.open(config);
            }
        };

        $scope.$on("LoginPerformed", function (event, response) {
            if ($scope.Variable.WaitingForClientLogin == true) {
                $scope.Variable.WaitingForClientLogin = false;
                var CurrentUser = response;
                if (CurrentUser && CurrentUser.UserType == USER_TYPE.Customer) {
                    console.log("Login info received...");
                    $scope.Order.ClientID = CurrentUser.ID;
                    transproService.SaveOrderWeb($scope.Order).then(function (response) {
                        var OrderFilter = { };
                        OrderFilter.OrderNo= response;
                        OrderFilter.cultureId = APP_SETTINGS.CultureCode;
                        OrderFilter.ApplicationId = APP_SETTINGS.ApplicationId;
                        var config = {};
                        config.url = API_URL.URL + "order/getWebOrders";
                        config.method = "POST";
                        config.data = OrderFilter;
                        $http(config).then(function (response) {
                            $state.go("payment", { Order: response.data[0] }, { reload: true });
                        }, function (error) {
                            alertMsg.show("error", "An error occured while retriving stored order data.");
                            console.log("Error occured while retriving saved order");
                        });
                    })
                    .catch(function (error) {
                        console.log("Error occured while generating order data: " + error);
                        alertMsg.show("error", "An error occured while storing order data into TransPro database.");
                    });
                }
            }
        });


        // Translators Pagination

        $scope.doCtrlPagingTranslators = function (page) {
            var begin = ((page - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;
            $scope.filterTranslators = $scope.TranslatorList.slice(begin, end);
        };

        $scope.openTranslatorWindow = function (translator) {
            $uibModal.open({
                component: "translatorProfileWindow",
                transclude: true,
                animation: true,
                resolve: {
                    Translator: function () {
                        return translator;
                    }
                },
                size: 'lg',
            });
        };


        $scope.$on("ErrorOnLogin", function (error) {
            if ($scope.Variable.WaitingForClientLogin == true) {
                $scope.Variable.WaitingForClientLogin = false;
                alertMsg.show("error", "The requested login was not confirmed. Please try with a valid email id and a valid password.");
            }
        });

        //$scope.max = 200;
        //$scope.random = function () {
        //    var value = Math.floor(Math.random() * 100 + 1);
        //    var type;
        //    if (value < 25) {
        //        type = 'success';
        //    } else if (value < 50) {
        //        type = 'info';
        //    } else if (value < 75) {
        //        type = 'warning';
        //    } else {
        //        type = 'danger';
        //    }
        //    $scope.showWarning = type === 'danger' || type === 'warning';
        //    $scope.dynamic = value;
        //    $scope.type = type;
        //};
        //$scope.random();
        //$scope.randomStacked = function () {
        //    $scope.stacked = [];
        //    var types = ['success', 'info', 'warning', 'danger'];
        //    for (var i = 0, n = Math.floor(Math.random() * 4 + 1) ; i < n; i++) {
        //        var index = Math.floor(Math.random() * 4);
        //        $scope.stacked.push({
        //            value: Math.floor(Math.random() * 30 + 1),
        //            type: types[index]
        //        });
        //    }
        //};
        //$scope.randomStacked();
    }

    angular
       .module("app")
       .controller("estimationController", estimationController);
    estimationController.$inject = ["$http", "$scope", "$state", "$uibModal", "transproService",
                                    "STORAGE_TYPE", "appStorageFactory", "USER_TYPE", "API_URL",
                                    "$stateParams", "APP_SETTINGS", "DELIVERY_TIMERANGE_TYPE",
                                    "PRICE_DETAILS_TYPE", 'alertMsg', 'fileUploadService', '$anchorScroll',
                                    '$location', "translatorService", "TRANSLATION_TYPE", "ORDER_STATUS",
                                    "PAYMENT_STATUS", "PAYMENT_METHOD", "TransproUtilityService"];
})();