(function () {
    var app = angular.module("app",
        [
            "ui.bootstrap",
            "ui.router",
            "ngResource",
            "angular.backtop",
            "afkl.lazyImage",
            "angular-loading-bar",           
            "ngCookies",          
            "ngMap",          
            "ngAnimate",            
            'ui.bootstrap.datetimepicker',
            'angular-icheck',
            "bw.paging" 
            , "ngMessages"
            , "angucomplete-alt"
            //, "ionSlider" //for ion slider for price setting [Note: not working with vm.prefix dynamics]
            //, "satellizer" // login :: comment not worked well
            , "ActivityMonitor"
            , "directive.g+signin"
            , "ngFacebook"
            //, "angularcustomtooltip" //for image tooltip at Search Hotel result , was not working
            , "rzModule",
            //"angular-lightbox"//for lighbox
            , "bootstrapLightbox" //alternate can used for bootstrap lightbox for angular "Lightbox" as dependency
            , "angular.css.injector"
            , "720kb.socialshare"
            //, "notyModule"
            , "sticky"
            , "ab-base64"
            , "angular-fotorama"
            , "angular.filter"
            , "ds.clock"
           // , "angularPayments" :tried to setup but we have some other validation in the booking form.
        ]);

    app.run(["$rootScope", "$state", "$stateParams",
      function ($rootScope, $state, $stateParams) {
          //console.log("run app module");
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
              //debugger;
              event.preventDefault();
          });

          $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
              $rootScope.stateIsLoading = true;
              //debugger
          });

          $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
              //debugger
              $rootScope.stateIsLoading = false;
            //  resetScroll();
              window.scrollTo(0, 0);
          });
      }
    ]);
    
    app.filter("trust", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
  
    angular.module('app').filter('objectByKeyValFilter', function () {
        return function (input, filterKey, filterVal) {
            var filteredInput = {};
            angular.forEach(input, function (value, key) {
                if (value[filterKey] && value[filterKey] === filterVal) {
                    filteredInput[key] = value;
                }
            });
            return filteredInput;
        }
    });
    
})();