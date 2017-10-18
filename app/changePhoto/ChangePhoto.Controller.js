(function () {
	'use strict';
	angular.module("app").controller("ChangePhotoController", function ($scope, $state, $rootScope, $uibModal, transproService, ChangePhotoService, APP_SETTINGS, appStorageFactory, STORAGE_TYPE, alertMsg) {
		var vm = this;
		vm.model = {};
		//Activate();


		var modelData = $state.params.modelData;
		vm.model.Image = modelData.Image;
		var CurrentUser = appStorageFactory.GetStorageObject(STORAGE_TYPE.CurrentUser);
		function Activate() {
		    transproService.getImageById().then(function (response) {
		        vm.model.Image = response.Image;
		    }).catch(function (error) {
		    });
		}
		$scope.uploadPhoto = function () {
			vm.model.ApplicationID = APP_SETTINGS.ApplicationId;
			vm.model.ID = CurrentUser.ID;
			ChangePhotoService.changePhoto(vm.model).then(onSuccessSave).catch(function (error) {
			}).catch(function (error) {
				alertMsg.show('error', error);
			});
		}
		var onSuccessSave = function (response) {
			alertMsg.show('success', 'Your Photo Has been Changed.');
			$state.go("/");
		}
	});
})();