﻿(function () {
    'use strict';
    angular.module("app").controller("noticeController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg, footermenuService) {
        var vm = this;
        vm.CurrentCulture = APP_SETTINGS.CultureCode;
        var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
        $scope.oneAtATime = true;
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;
        $scope.totalItems = 0;
        var NoticeList = {};
        

        vm.init = function () {

            getNotice();
        }

        var getNotice = function () {
            var key = 3;
            footermenuService.GetNotice(vm).then(function (response) {

               
                if (CurrentUser != null && CurrentUser.UserType== 1)
                {
                    NoticeList = _.filter(response, function (f) {
                        return f.ClientDisplayStatus == key;
                    });
                }
                else if (CurrentUser != null && CurrentUser.UserType == 2)
                {
                    NoticeList = _.filter(response, function (f) {
                        return f.StaffDisplayStatus == key;
                    });
                }
                else if (CurrentUser != null && CurrentUser.UserType == 3) {
                    NoticeList = _.filter(response, function (f) {
                        return f.PartnerDisplayStatus == key;
                    });
                }
                //else
                //{
                //    NoticeList = _.filter(response, function (f) {
                //        return f.PartnerDisplayStatus == 1 && f.StaffDisplayStatus == 1 & f.ClientDisplayStatus == 1;
                //    });
                //}

                $scope.vm.notices = NoticeList ==null? angular.copy(response): angular.copy(NoticeList);
            
            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }
        
    })
    .filter('startFrom', function () {
        return function (input, start) {
            if (input === undefined || input === null || input.length === 0 || start === undefined || start === null || start.length === 0 || start === isNaN) return [];
            start = +start; //parse to int

            try {
                var result = input.slice(start);
                return result;

            } catch (e) {

                console.error("Error in startFrom filter");
                return;
            }

        };
    });
 
})();