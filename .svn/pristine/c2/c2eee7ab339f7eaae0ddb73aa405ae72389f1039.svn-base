(function () {
    'use strict';

    function routeConfigurator($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $httpProvider, $locationProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
       // $locationProvider.hashPrefix(''); // by default '!'
       // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state("/", {
            url: "/",
            templateUrl: 'app/home/home.tmpl.html',
            controller: "homeController"
            //resolve: {
            //    LanguageList: ["transproService", function (transproService) {
            //        return transproService.getLanguages();
            //    }],
            //    TranslationFieldsList: ["transproService", function (transproService) {
            //        return transproService.getTranslationFileds();
            //    }]
            //}
        }).state("resetPassword", {
            parent: "/",
            url: "resetPassword",
            templateUrl: 'app/resetpassword/resetPassword.tmpl.html',
            controller: "resetPasswordController",
            params: { type: null }
        }).state("userRegistration", {
            parent: "/",
            url: "CustomerRegistration",
            templateUrl: 'app/registration/userRegistration.tmpl.html',
            controller: "registrationController",
            controllerAs: 'vm'
        }).state("registration", {
            parent: "/",
            url: "registration",
            params: { modelData: null, },
            templateUrl: 'app/registration/registration.tmpl.html',
            controller: "registrationController",
            controllerAs: 'vm'
        }).state("userguide", {
            parent: "/",
            url: "userguide",
            templateUrl: 'app/userguide/guide.customer.tmpl.html',
            controller: "userguideController"
        }).state("userguideTranslator", {
            parent: "/",
            url: "userguideTranslator",
            templateUrl: 'app/userguide/guide.translator.tmpl.html',
            controller: "userguideController"
        }).state("userguideIndividual", {
            parent: "/",
            url: "userguideIndividual",
            templateUrl: 'app/userguide/guide.individual.tmpl.html',
            controller: "userguideController"
        }).state("userguideOffice", {
            parent: "/",
            url: "userguideOffice",
            templateUrl: 'app/userguide/guide.office.tmpl.html',
            controller: "userguideController"
        }).state("faq", {
            parent: "/",
            url: "faq",
            templateUrl: 'app/faq/faq.tmpl.html'
        }).state("pricelist", {
            parent: "/",
            url: "fee",
            templateUrl: 'app/pricelist/pricelist.tmpl.html',
            controller: "pricelistController"
        }).state("evaluation", {
            parent: "/",
            url: "evaluation",
            templateUrl: 'app/evaluation/evaluation.tmpl.html'
        }).state("estimation", {
            parent: "/",
            url: "estimation",
            params: { Estimation: null },
            templateUrl: 'app/estimation/estimation.tmpl.html',
            controller: "estimationController"
        }).state("payment", {
            parent: "/",
            url: "payment",
            params: { Order: null },
            templateUrl: 'app/payment/paymentMethod.tmpl.html',
            controller: "paymentController"
        }).state("quality", {
            parent: "/",
            url: "quality",
            templateUrl: 'app/quality/quality.tmpl.html'
        }).state("translator", {
            parent: "/",
            url: "translator",
            params: {SearchTranslatorData: null},
            templateUrl: 'app/translator/translator.tmpl.html',
            controller: "translatorController"
        }).state("translatorReg", {
            parent: "/",
            url: "translatorReg",
            params: { modelData: null },
            templateUrl: 'app/translator/registration.tmpl.html',
            controller: "translatorController",
            controllerAs: 'vm'
        }).state("application", {
            parent: "/",
            url: "application",
            templateUrl: 'app/application/application.tmpl.html'
        }).state("strength", {
            parent: "/",
            url: "strength",
            templateUrl: 'app/strength/strength.tmpl.html'
        }).state("transevaluation", {
            parent: "/",
            url: "transevaluation",
            templateUrl: 'app/transevaluation/transevaluation.tmpl.html'
        }).state("successRegistration", {
            parent: "/",
            url: "successRegistration",
            templateUrl: 'app/registration/successRegistration.tmpl.html',
            controller: "registrationController"
        }).state("onlineTranslation", {
            parent: "/",
            url: "onlineTranslation",
            templateUrl: 'app/translationMethod/onlineTranslation.tmpl.html',
            controller: "homeController"
        }).state("appointedTranslation", {
            parent: "/",
            url: "appointedTranslation",
            templateUrl: 'app/translationMethod/appointedTranslation.tmpl.html',
            controller: "homeController"
        }).state("nativeCheck", {
            parent: "/",
            url: "nativeCheck",
            templateUrl: 'app/translationMethod/nativeCheck.tmpl.html',
            controller: "homeController"
        }).state("translatorCoordinator", {
            parent: "/",
            params: { modelData: null },
            url: "translatorCoordinator",
            templateUrl: 'app/translationMethod/translatorCoordinator.tmpl.html',
            controller: "translatorCoordinatorController",
            controllerAs: 'vm'
        }).state("translatorCoordinatorEstimaton", {
            parent: "/",
            params: { modelData: null },
            url: "translatorCoordinator",
            templateUrl: 'app/translationMethod/translatorCoordinatorConfirm.tmpl.html',
            controller: "translatorCoordinatorController",
            controllerAs: 'vm'

        }).state("translatorCoordinatorThanks", {
            parent: "/",
            url: "translatorCoordinator",
            templateUrl: 'app/translationMethod/thanks.tmpl.html',
            controller: "translatorCoordinatorController",
            controllerAs: 'vm'
        }).state("contact", {
            parent: "/",
            url: "contact",
            templateUrl: 'app/contact/contact.tmpl.html',
            controller: "contactController",
            controllerAs: 'vm'
        }).state("aboutus", {
            parent: "/",
            url: "aboutus",
            templateUrl: 'app/aboutus/aboutus.tmpl.html'
        }).state("caution", {
            parent: "/",
            url: "caution",
            templateUrl: 'app/footermenus/caution.tmpl.html'
        }).state("notice", {
            parent: "/",
            url: "notice",
            templateUrl: 'app/footermenus/notice.tmpl.html',
            controller: "noticeController",
            controllerAs: "vm"
        }).state("guideTranslator", {
            parent: "/",
            url: "guideTranslator",
            templateUrl: 'app/footermenus/userguide-translator.html'
        }).state("faqTranslator", {
            parent: "/",
            url: "faqTranslator",
            templateUrl: 'app/footermenus/faq.translator.html'
        }).state("sitemenu", {
            parent: "/",
            url: "sitemenu",
            templateUrl: 'app/footermenus/sitemenu.tmpl.html'
        }).state("privacy", {
            parent: "/",
            url: "privacy",
            templateUrl: 'app/footermenus/privacy.tmpl.html'
        }).state("terms", {
            parent: "/",
            url: "terms",
            templateUrl: 'app/footermenus/terms.tmpl.html'
        }).state("mypage", {
            parent: "/",
            url: "mypage",
            templateUrl: 'app/mypage/mypage.tmpl.html',
            controller: "mypageController"
        }).state("receivemessage", {
            parent: "/",
            params: { modelData: null },
            url: "receivemessage",
            templateUrl: 'app/receivemessage/receivemessage.tmpl.html',
            controller: "receiveMessageController"
        }).state("sentmessage", {
            parent: "/",
            params: { modelData: null },
            url: "sentmessage",
            controller: "SendMessageController",
            templateUrl: 'app/sentmessage/sentmessage.tmpl.html',
        }).state("orderbreakdown", {
            parent: "/",
            url: "orderbreakdown",
            templateUrl: 'app/orderbreakdown/orderbreakdown.tmpl.html',
            controller: "orderBreakdownController"
        }).state("billbreakdown", {
            parent: "/",
            url: "billbreakdown",
            templateUrl: 'app/billbreakdown/billbreakdown.tmpl.html',
            controller: "billbreakdownController"
        }).state("rearrangeregistered", {
            parent: "/",
            url: "rearrangeregistered",
            templateUrl: 'app/rearrangeregistered/rearrangeregistered.tmpl.html',
        }).state("receivingMails", {
            parent: "/",
            url: "receivingMails",
            templateUrl: 'app/receivingMails/receivingMails.tmpl.html',
            controller: "receivingmailController",
            controllerAs: "vm"
        }).state("reportErrors", {
            parent: "/",
            url: "reportErrors",
            templateUrl: 'app/reportErrors/reportErrors.tmpl.html',
            controller: "reportErrorController",
            controllerAs: 'vm'
        }).state("notation", {
            parent: "/",
            url: "notation",
            templateUrl: 'app/notation/notation.tmpl.html',
        }).state("estimate", {
            parent: "/",
            url: "estimate",
            templateUrl: 'app/estimate/estimate.tmpl.html',
        }).state("discount", {
            parent: "/",
            url: "discount",
            templateUrl: 'app/discount/discount.tmpl.html',
        }).state("business", {
            parent: "/",
            url: "business",
            templateUrl: 'app/business/business.tmpl.html',
            controller: "inquiryController",
            controllerAs: 'vm'
        }).state("detail", {
            parent: "/",
            url: "detail",
            templateUrl: 'app/detail/detail.tmpl.html',
        })
                 //.state("translatorProfile", {
                 //   parent: "/",
                 //   url: "translatorProfile",
                 //   params: { modelData: null },
                 //   templateUrl: 'app/translatorProfile/myProfile.tmpl.html',
                 //   controller: "translatorprofileController",
                 //   controllerAs: "vm"
                 //    })
                     .state("setPassword-en", {
                         parent: "/",
                         url: "setPassword-en?UserID&UserType",
                         templateUrl: 'app/resetpassword/SetPassword-en.html',
                         controller: "setPasswordController",
                         controllerAs: "vm"
                     }).state("changePhoto", {
                         parent: "/",
                         url: "changePhoto",
                         params: { modelData: null },
                         templateUrl: 'app/changePhoto/changePhoto.tmpl.html',
                         controller: "ChangePhotoController",
                         controllerAs: 'vm'
                     }).state("changePassword", {
                         parent: "/",
                         url: "changePassword",
                         params: { modelData: null },
                         templateUrl: 'app/changePassword/changePassword.tmpl.html',
                         controller: "ChangePasswordController",
                         controllerAs: 'vm'
                     }).state("withdrawal", {
                         parent: "/",
                         url: "withdrawal",
                         templateUrl: 'app/withdrawal/withdrawal.tmpl.html',
                         controller: "withdrawMembershipController",
                         controllerAs: 'vm'
                     }).state("penalty", {
                         parent: "/",
                         url: "penalty",
                         templateUrl: 'app/penalty/penalty.tmpl.html',
                         controller: "penaltyController",
                         controllerAs: 'vm'
                     }).state("translationFee", {
                         parent: "/",
                         url: "translationFee",
                         templateUrl: 'app/translationFee/translationFee.tmpl.html',
                         controller: "translationFeeController"
                     }).state("orderAppointed", {
                         parent: "/",
                         url: "orderAppointed",
                         templateUrl: 'app/orderAppointed/orderAppointed.tmpl.html',
                         controller: "orderAppointedController"
                     }).state("listOfOrders", {
                         parent: "/",
                         url: "listOfOrders",
                         templateUrl: 'app/listOfOrders/listOfOrders.tmpl.html',
                         controller: "listOfOrderController"
                     }).state("message", {
                         parent: "/",
                         url: "message",
                         params: { modelData: null },
                         templateUrl: 'app/message/messagebox.tmpl.html',
                         controller: "MessageController",
                         controllerAs: 'vm'

                     }).state("mypageTranslator", {
                         parent: "/",
                         url: "mypageTranslator",
                         templateUrl: 'app/mypageTranslator/mypageTranslator.tmpl.html',
                         controller: "mypageTranslatorController"
                     }).state("orderDetails", {
                         parent: "/",
                         url: "orderDetails?orderNo",
                         templateUrl: 'app/orderDetails/orderDetails.tmpl.html',
                         controller: "orderDetailsController"
                     }).state("sendMessageRead", {
                         parent: "/",
                         url: "sendMessageRead?msgId",
                         templateUrl: 'app/sentmessage/sendMessageRead.tmpl.html',
                         controller: "SendMessageReadController"
                     }).state("receiveMessageRead", {
                         parent: "/",
                         url: "receiveMessageRead?msgId",
                         templateUrl: 'app/receivemessage/receiveMessageRead.tmpl.html',
                         controller: "SendMessageReadController"
                     }).state("tranDetailProfile", {
                         parent: "/",
                         url: "translatorDetail?no",
                         templateUrl: 'app/translatorProfile/detailProfile.tmpl.html',
                         controller: "detailProfileController",
                         controllerAs: 'vm'
                     });

        // $stateProvider 
        //     .state('master', {
        //         abstract: true,
        //         templateUrl: 'app/layout/gbs.allstate.html',
        //         resolve: {
        //             languageResolve: function (hotelService) {
        //                 return hotelService.getCulture().then(function (response) {
        //                     return response;
        //                 }).catch(function (err) {

        //                 });
        //             },
        //             cultureResolve: function (languageResolve, hotelService, $cookies, $http) {
                     
        //                 var lang = $cookies.get("lang");
        //                 if (lang == null || lang == undefined) {
        //                     var json = 'http://ipinfo.io/json';
        //                     if (window.location.href.indexOf("https") != -1) {
        //                         json = 'https://ipinfo.io/json';
        //                     }
        //                   //  var promie = $http.get(json);
        //                     $.ajax({
        //                         url: json,
        //                         async: false,
        //                         dataType: 'json',
        //                         success: function (data) {
        //                             // do stuff with response.
        //                             lang = "en";
                                    
        //                             if (data.country == 'FR')
        //                                 lang = "fr";
        //                             if (data.country == 'RU')
        //                                 lang = "ru";
        //                             if (data.country == 'DE')
        //                                 lang = "de";
        //                             if (data.country == 'GB')
        //                                 lang = "en";
        //                             if (data.country == 'TR')
        //                                 lang = "tr";
        //                             if (data.country == 'SA')
        //                                 lang = "ar";
        //                             $cookies.put("lang", lang, { expires: GBSHelper.helpers.getCookieExpire() });
        //                             return hotelService.getCurrencyLoad(lang).then(function (response) { return response; }).catch(function (err) { console.log(err) });
        //                         }
        //                     });
        //                 }
        //                 else {
        //                     return hotelService.getCurrencyLoad(lang).then(function (response) { return response; }).catch(function (err) { console.log(err) });
        //                 }
        //             }

        //         }
        //     })
        //     .state('master.gbs', {
        //         abstract: true,
        //         views: {
        //             "HeaderView": {
        //                 templateUrl: "app/layout/topnav.html?v=3.10",
        //                 controller: "topNavigationController",
        //                 controllerAs: "vm",

        //             },
        //             "ContentView": {
        //                 templateUrl: "app/layout/content.tmpl.html?v=3.10"
        //             },
        //             "FooterView": {
        //                 templateUrl: "app/layout/footer.html?v=3.10",
        //                 controller: "footerController",
        //                 controllerAs: "vm"
        //             }
        //         }
        //     });
     
    }
    function allowCookie($httpProvider) {
      // $httpProvider.defaults.withCredentials = true;
    }
   
    String.prototype.trunc = String.prototype.trunc ||
      function (n) {
          return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
      };
        var facebookID =
        (
            window.location.href.indexOf('localhost') != -1 ?
            '253111121388184' //this is for locahost testing
            : '1103816132975397' //  live: clientId
        );
    
    //to save last position of scroll on view state changes : BY: Abhishek on 30-09-2016
    // Not working now, may be some issue 
    function fnkeepScrollPos($route, $window, $timeout, $location, $anchorScroll) {
            // cache scroll position of each route's templateUrl
            var scrollPosCache = {};
            // compile function
            return function(scope, element, attrs) {

                scope.$on('$routeChangeStart', function() {
                    // store scroll position for the current view
                    if ($route.current) {
                        scrollPosCache[$route.current.loadedTemplateUrl] = [ $window.pageXOffset, $window.pageYOffset ];
                    }
                });

                scope.$on('$routeChangeSuccess', function () {
                   
                    // if hash is specified explicitly, it trumps previously stored scroll position
                    if ($location.hash()) {
                        $anchorScroll();

                        // else get previous scroll position; if none, scroll to the top of the page
                    } else {
                        var prevScrollPos = scrollPosCache[$route.current.loadedTemplateUrl] || [ 0, 0 ];
                        $timeout(function() {
                            $window.scrollTo(prevScrollPos[0], prevScrollPos[1]);
                        }, 0);
                    }
                });
            }
       

    }

   
    angular
        .module('app')
        .config(routeConfigurator)
        .config(allowCookie)
        .config(['$facebookProvider', function ($facebookProvider) {
            $facebookProvider.setAppId(facebookID).setPermissions(['email', 'user_friends']);
        }])
        .run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {
            //console.log("run app config");
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            $rootScope.$on('fb.load', function () {
                $window.dispatchEvent(new Event('fb.load'));
            });

            // initialise google analytics
            $window.ga('create', 'UA-46104079-1', 'auto');
            //ga('create', 'UA-46104079-1', 'auto');
            //ga('send', 'pageview');
            // track pageview on state change
            $rootScope.$on('$stateChangeSuccess', function (event) {
                $window.ga('send', 'pageview', $location.path());
            });

        }])
        .constant("API_URL", {
            URL: (window.location.href.indexOf('localhost') != -1 ? 
                      "http://localhost:58580/"
                 :
                    "http://163.47.35.165:8081/"
                 )
        })
        .constant("APP_SETTINGS", {
            ApplicationId: 2,
            CultureCode: "en",
            CurrencyId: 7,
            CurrencyCode:"AUD"
        })
        .constant("COMPANY_REGISTRATION_TYPE", {
            Individual: 1,
            LegalEntity: 2,
            Public: 3
        })
        .constant("STORAGE_TYPE", {
            CustomerData: "CustomerData",
            TranslatorData: "TranslatorData",
            PartnerData: "PartnerData",
            CurrentUser: "CurrentUser",
            RegisterType: "RegisterType",
            SetTargetLang: "SetTargetLang"
        })
        .constant("NOTICE_SETTINGS_FOR", {
           Client: 1,
           Translator: 2,
           PartnerCompany: 3,
           Administrator: 4
        })
        .constant("USER_TYPE", {
           Customer: 1,
           Translator: 2,
           Partner: 3
        })
        .constant("TRANSLATION_TYPE", {
            Online: 1,
            Appointed: 2,
            NativeCheck: 3,
            TranslatorCoordinator: 4
        })
        .constant("ORDER_STATUS", {
            WaitingForConfirmation : 1,
            Arranging : 2,
            Ordered : 3,
            WaitingForStaffConfirmation : 4,
            InProgress : 5,
            Delivered: 6,
            Evaluated : 7,
            WaitingForDeposit : 8,
            OrderCompleted: 9,
            Complaint : 10,
            Cancel :11,
            Deleted: 12
        })
        .constant("DELIVERY_TIMERANGE_TYPE", {
            RangeInMinutes: 1,
            RangeInHours: 2,
            RangeInDays: 3
        })
        .constant("PRICE_DETAILS_TYPE", {
            LightPrice: 1,
            BusinessPrice: 2,
            ExpertPrice: 3
        })
        .constant("PAYMENT_METHOD", {
            CreditCard:1,
            MonthlyPayment:2,
            RequestedPayment:3        
        })
        .constant("PAYMENT_STATUS", {
            Unpaid:0,
            Paid:1
        })
        .constant("TRANSLATION_LEVEL_TYPE", {
            Light: 1,
            Business: 2,
            Expert: 3
        })
        .constant("GOOGLE_API_KEY",{
            KEY:(window.location.href.indexOf('localhost') != -1 ? 
                      "AIzaSyCxWF0eLCoV4XdLU-CLZl88LO4frFVitqI"
                    : "AIzaSyBWUA5rOR3O3p9Y2b0_py7oeOmI76NLCeA"
                 ),
            URL: "https://www.googleapis.com/plus/v1/people",
            USERCONTENT: (window.location.href.indexOf('localhost') != -1 ? 
                    "1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com"
                    :"1005463768683-j5utop9jun4o6d84m3jqeage1gogkijv.apps.googleusercontent.com"
                    // OLD MVC :  "368302432175-00mdonk78c454dvohgup6h0fl95glvbi.apps.googleusercontent.com"
                 )
        })
    //new directive reference : http://jsfiddle.net/abhishekbhalani/hqLjq3fb/
    .directive('autoScroll', function ($document, $timeout, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.okSaveScroll = true;
                scope.scrollPos = {};
                $document.bind('scroll', function () {
                    if (scope.okSaveScroll) {
                        scope.scrollPos[$location.path()] = $(window).scrollTop();
                    }
                });

                scope.scrollClear = function (path) {
                    scope.scrollPos[path] = 0;
                };

                scope.$on('$locationChangeSuccess', function (route) {
                    $timeout(function () {
                        $(window).scrollTop(scope.scrollPos[$location.path()] ? scope.scrollPos[$location.path()] : 0);
                        scope.okSaveScroll = true;
                    }, 0);
                });

                scope.$on('$locationChangeStart', function (event) {
                    scope.okSaveScroll = false;
                });
            }
        };
    })
   // .directive('compileHtml', compileHtml)

    // Common directive for Focus
    .directive('focus',
        function ($timeout) {
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === "true") {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    );
    
   
    routeConfigurator.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider","$httpProvider","$locationProvider"];
   
})();