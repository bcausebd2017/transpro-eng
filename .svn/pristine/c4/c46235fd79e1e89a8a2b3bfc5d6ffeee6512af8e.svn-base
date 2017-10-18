(function () {
	'use strict';
	//angular.module("app").controller("reportErrorController", function ($scope, $state, $rootScope, $uibModel, transproService, reportErrorService, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg) {
	angular.module("app").controller("reportErrorController", function ($scope, $state, $rootScope, $uibModal, transproService, reportErrorService, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg) {
	    var vm = this;
	    vm.model = {};
	    vm.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z-]+\.[a-z.]{1,5}$/;

		$scope.saveReportError = function () {
			$scope.isTriedSave = true;
			if (!isValidInput())
				return;
			vm.model.ApplicationID = APP_SETTINGS.ApplicationId;
			reportErrorService.submitReportError(vm.model).then(onSuccessSave).catch(function (error) {
			}).catch(function (error) {
				alertMsg.show('error', error);
			});
		}

		var onSuccessSave = function (response) {
		    alertMsg.show('success', 'Your report has been submitted successfully.');
		    $state.go("/");
		}

		function isValidInput() {
		    if (!vm.model.Email || vm.model.Email == "") {
		        return false;
		    }
		    if (!vm.model.ErrorPageUrl || vm.model.ErrorPageUrl == "") {
		        return false;
		    }
		    if (!vm.model.ErrorMessage || vm.model.ErrorMessage == "") {
		        return false;
		    }
		    if (!vm.model.OsName || vm.model.OsName == "") {
		        return false;
		    }
		    if (!vm.model.BrowserVersion || vm.model.BrowserVersion == "") {
		        return false;
		    }
		    if (!vm.model.Reproducibility || vm.model.Reproducibility == "") {
		        return false;
		    }
		    if (!vm.model.ErrorDescription || vm.model.ErrorDescription == "") {
		        return false;
		    }
		   
		    return true;
		}


	});
})();